import type {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

export default class AuthController {
  public async logout({auth, response}: HttpContextContract) {
    await auth.use("api").revoke();
    return response.json({});
  }

  /**
   * in the react-native app, the webview know if the auth is success if it is redirect
   * to the url "http://.../success?userToken=..." and get the api token from the params
   */
  public async success({response}: HttpContextContract) {
    return response.json({});
  }
}
