import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Gender from 'App/Models/Gender'
import { inject } from '@adonisjs/fold'

@inject()
export default class GendersController {
  public async getAll({}: HttpContextContract) {
    const genders = await Gender.query()
    return {
      data: genders,
    }
  }
}
