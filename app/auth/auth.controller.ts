import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { inject } from '@adonisjs/fold'

@inject()
export default class AuthController {
  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return {}
  }

  /**
   * in the react-native app, the webview know if the auth is success if it is redirect
   * to the url "http://.../success?userToken=..." and get the api token from the params
   */
  public async success({}: HttpContextContract) {
    return {}
  }
}
