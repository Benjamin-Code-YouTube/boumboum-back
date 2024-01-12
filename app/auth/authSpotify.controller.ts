import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { inject } from '@adonisjs/fold'
import { AllyContract } from '@ioc:Adonis/Addons/Ally'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
import * as console from 'console'
import Env from '@ioc:Adonis/Core/Env'
import AuthProviders from 'App/Models/AuthProviders'
import { OpaqueTokenContract } from '@ioc:Adonis/Addons/Auth'
import Track from 'App/Models/Track'
import Artist from 'App/Models/Artist'
import TechnicalException from 'App/Exceptions/TechnicalException'
import SpotifyService from 'App/Services/SpotifyService'

@inject()
export default class AuthSpotifyController {
  constructor(private spotifyService: SpotifyService) {}

  public async authorize({ ally }: HttpContextContract) {
    return ally.use('spotify').stateless().redirect()
  }

  private useSpotify(ally: AllyContract) {
    const spotify = ally.use('spotify').stateless()
    /**
     * User has explicitly denied the login request
     */
    if (spotify.accessDenied()) {
      throw new UnAuthorizedException('Access was denied')
    }
    /**
     * Unable to verify the CSRF state
     */
    if (spotify.stateMisMatch()) {
      throw new UnAuthorizedException('Request expired. try again')
    }
    /**
     * There was an unknown error during the redirect
     */
    if (spotify.hasError()) {
      console.log(spotify.getError())
      throw new UnAuthorizedException('something went wrong with provider')
    }
    return spotify
  }

  private async initializeUserData(user: User) {
    const trackExist = await Track.query().where('user_id', user.id)
    if (!trackExist?.length) {
      const topTracks = await this.spotifyService.getTracks(user.id)
      const topTracksSaved = await this.spotifyService.saveTracks(user.id, topTracks)
      if (!topTracksSaved?.status) throw Error('Unable to save top tracks')
    }
    const artists = await Artist.query().where('user_id', user.id)
    if (!artists?.length) {
      const topArtists = await this.spotifyService.getArtists(user.id)
      const topArtistsSaved = await this.spotifyService.saveArtists(user.id, topArtists)
      if (!topArtistsSaved?.status) throw new TechnicalException('Unable to save artists tracks')
    }
  }

  public async callback({ ally, auth, response }: HttpContextContract) {
    const spotify = this.useSpotify(ally)
    const { token, email, id: providerUserId, name } = await spotify.user()
    const user = await User.firstOrCreate(
      {
        email: email as string,
      },
      {
        email: email as string,
        name: name,
      }
    )
    await AuthProviders.updateOrCreate(
      {
        name: 'spotify',
        userId: user.id,
      },
      {
        accessToken: token.token,
        refreshToken: token.refreshToken,
        type: token.type,
        expiresIn: token.expiresIn,
        expiresAt: token.expiresAt,
        providerUserId,
      }
    )
    await this.initializeUserData(user)
    const authToken = await this.generateUserToken(auth, user)
    response.redirect(this.buildSuccessUrl(authToken, user))
  }

  private buildSuccessUrl(authToken: OpaqueTokenContract<User>, user: User) {
    const url = new URL(Env.get('SPOTIFY_SUCCESS_URL', `${Env.get('BASE_API_URL')}/auth/success`))
    url.searchParams.append('userToken', authToken.token)
    url.searchParams.append('userId', user.id)
    return url.toString()
  }

  private generateUserToken(auth: HttpContextContract['auth'], user: User) {
    return auth.use('api').generate(user, {
      expiresIn: Env.get('EXPIRES_IN', '1h'),
    })
  }
}
