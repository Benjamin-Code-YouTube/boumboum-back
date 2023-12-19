import type {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

import Gender from "App/Models/Gender";
import {inject} from "@adonisjs/fold";

@inject()
export default class GendersController {
  public async index({}: HttpContextContract) {
    const genders = await Gender.query();
    return {
      status: true,
      data: genders,
      message: "Successfully fetched genders",
    };
  }
}
