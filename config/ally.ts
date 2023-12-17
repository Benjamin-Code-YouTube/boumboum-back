/**
 * Config source: https://git.io/JOdi5
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import {AllyConfig} from '@ioc:Adonis/Addons/Ally'
import ConfigurationService from "App/Services/ConfigurationService";


const SPOTIFY_CONFIG = ConfigurationService.getSpotifyConfig()
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
    clientId: SPOTIFY_CONFIG.clientId,
    clientSecret: SPOTIFY_CONFIG.clientSecret,
    callbackUrl: SPOTIFY_CONFIG.callbackUrl,
    scopes: SPOTIFY_CONFIG.scope,
    showDialog: false
  },
}

export default allyConfig
