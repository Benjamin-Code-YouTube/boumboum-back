import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Gender from "App/Models/Gender";

export default class GendersController {
  public async index({ response }: HttpContextContract) {
    try {
      const genders = await Gender.query();
      return response.json({
        status: true,
        data: genders,
        message: "Successfully fetcehd genders",
      });
    } catch (err) {
      return response.json({
        status: false,
        message: "Something went wrong.",
      });
    }
  }
}
