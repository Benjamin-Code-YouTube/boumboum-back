import Env from '@ioc:Adonis/Core/Env'

export enum NodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export default class ConfigurationService {
  public static DEFAULT_SPOTIFY_API_URL = 'https://api.spotify.com/v1'

  public static getSpotifyApiUrl(): string {
    return Env.get('SPOTIFY_API_URL', this.DEFAULT_SPOTIFY_API_URL)
  }

  public static isServerInDevMode(): boolean {
    return Env.get('NODE_ENV', NodeEnv.DEVELOPMENT) === NodeEnv.DEVELOPMENT
  }
}
