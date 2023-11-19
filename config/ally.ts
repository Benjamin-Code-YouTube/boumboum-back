/**
 * Config source: https://git.io/JOdi5
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { AllyConfig } from '@ioc:Adonis/Addons/Ally'

/*
|--------------------------------------------------------------------------
| Ally Config
|--------------------------------------------------------------------------
|
| The `AllyConfig` relies on the `SocialProviders` interface which is
| defined inside `contracts/ally.ts` file.
|
*/
const allyConfig: AllyConfig = {
  /*
  |--------------------------------------------------------------------------
  | Spotify driver
  |--------------------------------------------------------------------------
  */
  spotify: {
    driver: 'spotify',
    clientId: Env.get('SPOTIFY_CLIENT_ID'),
    clientSecret: Env.get('SPOTIFY_CLIENT_SECRET'),
    callbackUrl: Env.get('SPOTIFY_CALLBACK_URL', 'http://localhost:3333/api/signin-callback'),
    scopes: ['user-read-email', 'user-top-read', 'user-follow-read'],
    showDialog: false
  },
}

export default allyConfig
