import type {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Artist from "App/Models/Artist";
import SocialToken from "App/Models/SocialToken";
import Track from "App/Models/Track";
import User from "App/Models/User";
import SpotifyService from "App/Services/SpotifyService";
import {inject} from "@adonisjs/fold";
import {AllyContract} from "@ioc:Adonis/Addons/Ally";
import UnAuthorizedException from "App/Exceptions/UnAuthorizedException";
import TechnicalException from "App/Exceptions/TechnicalException";

@inject()
export default class AuthSpotifyController {

  constructor(private spotifyService: SpotifyService) {
  }

  public async authorize({ally}: HttpContextContract) {
    return ally.use("spotify").stateless().redirect();
  }

  private useSpotify(ally: AllyContract) {
    const spotify = ally.use("spotify").stateless();
    /**
     * User has explicitly denied the login request
     */
    if (spotify.accessDenied()) {
      throw new UnAuthorizedException("Access was denied")
    }
    /**
     * Unable to verify the CSRF state
     */
    if (spotify.stateMisMatch()) {
      throw new UnAuthorizedException("Request expired. try again")
    }
    /**
     * There was an unknown error during the redirect
     */
    if (spotify.hasError()) {
      console.log(spotify.getError())
      throw new UnAuthorizedException("something went wrong with provider")
    }
    return spotify
  }

  public async callback({ally, auth, response}: HttpContextContract) {
    const spotify = this.useSpotify(ally)
    const user = await spotify.user();
    const {token} = user;
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
      throw new TechnicalException()
    }
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
    const trackExist = await Track.query().where("user_id", newUser.id);
    if (!trackExist?.length) {
      const topTracks = await this.spotifyService.getTracks(newUser.id);
      const topTracksSaved = await this.spotifyService.saveTracks(
        newUser.id,
        topTracks
      );
      if (!topTracksSaved?.status) throw Error("Unable to save top tracks");
    }
    const artists = await Artist.query().where("user_id", newUser.id);
    if (!artists?.length) {
      const topArtists = await this.spotifyService.getArtists(newUser.id);
      const topArtistsSaved = await this.spotifyService.saveArtists(
        newUser.id,
        topArtists
      );
      if (!topArtistsSaved?.status)
        throw new TechnicalException("Unable to save artists tracks");
    }
    const userToken = await auth.use("api").generate(newUser, {
      expiresIn: "90 mins",
    });
    response.redirect(`/api/auth/success?userToken=${encodeURIComponent(userToken.token)}`);
  }
}
