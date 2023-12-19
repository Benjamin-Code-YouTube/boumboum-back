import type {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

import User from "App/Models/User";
import Match from "App/Models/Match";
import CreateMatchValidator from "App/Validators/CreateMatchValidator";
import {inject} from "@adonisjs/fold";
import NotFountException from "App/Exceptions/NotFountException";
import BadRequestException from "App/Exceptions/BadRequestException";

@inject()
export default class MatchesController {

  /* potential matches */

  // retrieve list of user's based on there gender preference
  public async get({auth}: HttpContextContract) {
    const user = await auth.authenticate();
    const userId = user.id;

    const currentUser = await User.query()
      .where("id", userId)
      .preload("profile")
      .first();
    const profile = currentUser?.profile;

    if (!profile?.preferedGenderId) {
      throw new NotFountException("Profile not exist")
    }

    const users = await User.query()
      .whereNot("id", userId)
      .preload("profile")
      .with("profile", (q) => {
        q.where("prefered_gender_id", profile.preferedGenderId);
      });

    const mappedUsers = users?.map((u) => {
      return {
        id: u.id,
        name: u.name,
        avatar: u?.profile?.avatar,
      };
    });
    return {
      data: mappedUsers,
    }
  }


  /* mark match */
  public async mutualMatch({request, auth}: HttpContextContract) {
    const user = await auth.authenticate();
    const authId = user.id;

    const payload = await request.validate(CreateMatchValidator);
    const {userId} = payload;
    if (authId == userId) {
      throw new BadRequestException("Cannot mark youself as match.")
    }

    const userExist = await User.query().where("id", userId).first();
    if (!userExist) {
      throw new NotFountException("User not found.")
    }

    const matchExist = await Match.query()
      .where("matcher_user_id", userId)
      .where("matched_user_id", authId)
      .first();

    if (matchExist) {
      await Match.query().where("id", matchExist.id).update({
        mutual_match: 1,
        match_date: new Date(),
      });

      const matchedUser = await User.query()
        .where("id", userId)
        .select("name", "email")
        // .preload("profile")
        .first();

      const userData = {
        name: matchedUser?.name,
        email: matchedUser?.email,
      };

      return {
        message: "It's a mutual match",
        data: userData,
      }
    }

    const newMatch = new Match();
    newMatch.matcherUserId = authId;
    newMatch.matchedUserId = userId;
    await newMatch.save();

    return {
      message: "Match has been marked.",
    }
  }

  /* get mutual match history */
  public async history({auth}: HttpContextContract) {
    const user = await auth.authenticate();
    const authId = user.id;

    const matchHistory = await Match.query()
      .where("matcher_user_id", authId)
      .orWhere("matched_user_id", authId)
      .where("mutual_match", 1);

    const userIds = matchHistory?.map((history: Match) => {
      return history.matcherUserId == authId
        ? String(history.matchedUserId)
        : String(history.matcherUserId);
    });

    const users = await User.query()
      .whereIn("id", userIds)
      .select("name", "email")

    return {
      data: users,
      message: "Mutual match history.",
    }
  }
}
