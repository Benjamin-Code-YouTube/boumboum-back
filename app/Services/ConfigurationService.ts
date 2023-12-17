import Env from "@ioc:Adonis/Core/Env";

export enum DatabaseConnection {
  MY_SQL = 'mysql'
}

export enum DriveDisk {
  LOCAL = 'local'
}

export enum SessionDriver {
  COOKIE = 'cookie'
}

export enum NodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export type DiskConfiguration = {
  driveDisk: DriveDisk;
}

export type SessionConfiguration = {
  sessionDriver: SessionDriver;
}

export type SpotifyConfiguration = {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
  scope: string[];
}

export type DatabaseConfiguration = {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
  connection: DatabaseConnection;
}

export type ServerConfiguration = {
  host: string;
  port: number;
}

export enum HashDriverName {
  SCRYPT = 'scrypt',
  ARGON = 'argon',
  BCRYPT = 'bcrypt',
}

export default class ConfigurationService {

  public static DEFAULT_SPOTIFY_API_URL = "https://api.spotify.com/v1"

  public static getSpotifyApiUrl(): string {
    return Env.get('SPOTIFY_API_URL', this.DEFAULT_SPOTIFY_API_URL)
  }

  public static getDatabaseConfig(): DatabaseConfiguration {
    return {
      host: Env.get('DATABASE_HOST', '0.0.0.0'),
      port: Env.get('DATABASE_PORT', 3333),
      user: Env.get('DATABASE_USER', 'root'),
      password: Env.get('DATABASE_PASSWORD', ''),
      name: Env.get('DATABASE_NAME', 'music_matching'),
      connection: DatabaseConnection.MY_SQL
    }
  }

  public static getDiskConfig(): DiskConfiguration {
    return {
      driveDisk: Env.get('DRIVE_DISK', DriveDisk.LOCAL),
    }
  }

  public static getSessionConfig(): SessionConfiguration {
    return {
      sessionDriver: Env.get('SESSION_DRIVER', SessionDriver.COOKIE),
    }
  }

  public static getSpotifyConfig(): SpotifyConfiguration {
    const SERVER_CONFIG = this.getServerConfig()
    return {
      clientId: Env.get('SPOTIFY_CLIENT_ID'),
      clientSecret: Env.get('SPOTIFY_CLIENT_SECRET'),
      callbackUrl: Env.get('SPOTIFY_CALLBACK_URL', [
        `http://${SERVER_CONFIG.host}${SERVER_CONFIG.port}`,
        '/api/signin-callback'
      ].join('/')),
      scope: ['user-read-email', 'user-top-read', 'user-follow-read']
    }
  }

  private static getServerConfig(): ServerConfiguration {
    return {
      host: Env.get('HOST', '0.0.0.0'),
      port: Env.get('PORT', 3333),
    }
  }

  public static isServerInDevMode(): boolean {
    return Env.get('NODE_ENV', NodeEnv.DEVELOPMENT) === NodeEnv.DEVELOPMENT
  }

  public static getHashDriverName() {
    return Env.get('HASH_DRIVER', HashDriverName.SCRYPT)
  }
}
