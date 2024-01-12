import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Profile from 'App/Models/Profile'
import SpotifyService from 'App/Services/SpotifyService'
import CreateProfileValidator from 'App/Validators/CreateProfileValidator'
import { inject } from '@adonisjs/fold'

@inject()
export default class ProfilesController {
  constructor(private spotifyService: SpotifyService) {}

  public async get({ auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const userId = user.id

    const profile = await Profile.query().where('user_id', userId).first()
    return {
      data: profile,
    }
  }

  public async store({ request, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const userId = user.id
    const payload = await request.validate(CreateProfileValidator)
    const { dateOfBirth, description, preferedGenderId, trackIds } = payload

    const fileName = `${new Date().getTime()}.${payload.avatar.subtype}`
    await payload.avatar.moveToDisk('./', {
      name: fileName,
    })

    //save top 4 selected tracks by user
    const favoriteTracks = await this.spotifyService.updateFavorityTrack(userId, trackIds)
    if (!favoriteTracks?.status) throw Error('unable to update favorite tracks')

    //Profile saved
    let profile
    profile = await Profile.query().where('user_id', userId).first()
    profile = profile ? profile : new Profile()
    profile.dateOfBirth = new Date(dateOfBirth)
    profile.description = description
    profile.avatar = `/uploads/${fileName}`
    profile.preferedGenderId = preferedGenderId
    profile.userId = userId
    await profile.save()

    return {
      status: true,
      message: 'Profile Successfully Created',
      data: profile,
    }
  }
}
