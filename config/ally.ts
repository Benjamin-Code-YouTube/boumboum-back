/**
 * Config source: https://git.io/JOdi5
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import { AllyConfig } from '@ioc:Adonis/Addons/Ally'
import Env from '@ioc:Adonis/Core/Env'

export enum OAuthProviderName {
  SPOTIFY = 'spotify',
}

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
  [OAuthProviderName.SPOTIFY]: {
    driver: 'spotify',
    clientId: Env.get('SPOTIFY_CLIENT_ID'),
    clientSecret: Env.get('SPOTIFY_CLIENT_SECRET'),
    callbackUrl: Env.get(
      'SPOTIFY_CALLBACK_URL',
      `${Env.get('BASE_API_URL')}/auth/spotify/callback`
    ),
    scopes: ['user-read-email', 'user-top-read', 'user-follow-read'],
    showDialog: false,
  },
}

export default allyConfig
