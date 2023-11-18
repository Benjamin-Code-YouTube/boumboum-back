import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Profile from "App/Models/Profile";
import SpotifyService from "App/Services/SpotifyService";
import CreateProfileValidator from "App/Validators/CreateProfileValidator";

export default class ProfilesController {
  public async get({ response, auth }: HttpContextContract) {
    try {
      const userId = auth.user?.id;
      if (!userId) {
        response.status(401);
        return;
      }

      const profile = await Profile.query().where("user_id", userId).first();
      return response.json({
        data: profile,
      });
    } catch (err) {
      return response.json({
        status: false,
        message: "Something went wrong.",
      });
    }
  }
  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const userId = auth.user?.id;
      if (!userId) {
        response.status(401);
        return;
      }
      const payload = await request.validate(CreateProfileValidator);
      const { dateOfBirth, description, preferedGenderId, trackIds } =
      payload;

      const fileName = `${new Date().getTime()}.${payload.avatar.subtype}`;
      await payload.avatar.moveToDisk("./", {
        name: fileName,
      });

      //save top 4 selected tracks by user
      const favoriteTracks = await SpotifyService.updateFavorityTrack(
        userId,
        trackIds
      );
      if (!favoriteTracks?.status)
        throw Error("unable to update favorite tracks");

      //Profile saved
      let profile;
      profile = await Profile.query().where("user_id", userId).first();
      profile = profile ? profile : new Profile();
      profile.dateOfBirth = new Date(dateOfBirth);
      profile.description = description;
      profile.avatar = `/uploads/${fileName}`;
      profile.preferedGenderId = preferedGenderId;
      profile.userId = userId;
      await profile.save();

      return response.json({
        status: true,
        message: "Profile Successfully Created",
        data: profile,
      });
    } catch (err) {
      return response.json({
        status: false,
        message: "Unable to create profile",
        errors: err?.messages?.errors,
      });
    }
  }
}
