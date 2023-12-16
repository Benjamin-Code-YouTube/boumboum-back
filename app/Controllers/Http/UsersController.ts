import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Artist from "App/Models/Artist";
import SocialToken from "App/Models/SocialToken";
import Track from "App/Models/Track";
import User from "App/Models/User";
import SpotifyService from "App/Services/SpotifyService";

export default class UsersController {
  public async redirect({ ally }: HttpContextContract) {
    return ally.use("spotify").stateless().redirect();
  }

  public async success({ response }: HttpContextContract) {
    return response.json({});
  }

  public async handleCallback({ ally, auth, response }: HttpContextContract) {
    try {
      const spotify = ally.use("spotify").stateless();

      /**
       * User has explicitly denied the login request
       */
      if (spotify.accessDenied()) {
        return "Access was denied";
      }

      /**
       * Unable to verify the CSRF state
       */
      if (spotify.stateMisMatch()) {
        return "Request expired. try again";
      }

      /**
       * There was an unknown error during the redirect
       */
      if (spotify.hasError()) {
        return spotify.getError();
      }

      /**
       * Managing error states here
       */

      const user = await spotify.user();

      const { token } = user;

      const findUser = {
        email: user.email as string,
      };

      const userDetails = {
        name: user.name as string,
        email: user.email as string,
        provider: "spotify",
        access_token: token.token as any,
      };

      const newUser = await User.firstOrCreate(findUser, userDetails);

      if (!newUser) {
        return response.json({
          status: false,
          message: "Something went wrong.",
        });
      }

      /* Save Social Token */
      let socialToken = await SocialToken.query()
        .where("user_id", newUser.id)
        .first();

      socialToken = socialToken ? socialToken : new SocialToken();
      socialToken.user_id = newUser.id;
      socialToken.token = token.token;
      socialToken.refreshToken = token.refreshToken;
      socialToken.type = token.type;
      socialToken.expiresAt = new Date(token.expiresAt.toString()).toISOString().slice(0, 19).replace('T', ' ');

      await socialToken.save();
      /* Save Social Token */

      //save top 20 tracks from spotify service
      const trackExist = await Track.query().where("user_id", newUser.id);
      if (!trackExist?.length) {
        const topTracks = await SpotifyService.getTracks(newUser.id);
        const topTracksSaved = await SpotifyService.saveTracks(
          newUser.id,
          topTracks
        );
        if (!topTracksSaved?.status) throw Error("Unable to save top tracks");
      }

      //save top 20 artists from spotify service

      const artists = await Artist.query().where("user_id", newUser.id);
      if (!artists?.length) {
        const topArtists = await SpotifyService.getArtists(newUser.id);
        const topArtistsSaved = await SpotifyService.saveArtists(
          newUser.id,
          topArtists
        );
        if (!topArtistsSaved?.status)
          throw Error("Unable to save artists tracks");
      }

      // Generate API token

      const userToken = await auth.use("api").generate(newUser, {
        expiresIn: "90 mins",
      });

      response.redirect(`/api/signin-success?userToken=${encodeURIComponent(userToken.token)}`);
      // response.json({ /* newUser, */ userToken /* , socialToken */ });
    } catch (err) {
      console.log(err);
      response.json({
        status: false,
        message: "Something went wrong.",
      });
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use("api").revoke();
    return response.json({
      revoked: true,
    });
  }
}
