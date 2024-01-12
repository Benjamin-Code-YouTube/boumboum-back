/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'
import { HashDriverName } from 'Config/hash'
import { DriveDiskName } from 'Config/drive'
import { DatabaseConnectionName } from 'Config/database'
import { NodeEnv } from 'App/Services/ConfigurationService'

export default Env.rules({
  // server
  HOST: Env.schema.string.optional({ format: 'host' }),
  PORT: Env.schema.number.optional(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum.optional(Object.values(DriveDiskName)),
  NODE_ENV: Env.schema.enum.optional(Object.values(NodeEnv)),
  // database
  DB_CONNECTION: Env.schema.enum.optional(Object.values(DatabaseConnectionName)),
  // main database
  DATABASE_HOST: Env.schema.string.optional({ format: 'host' }),
  DATABASE_NAME: Env.schema.string.optional(),
  DATABASE_PASSWORD: Env.schema.string.optional(),
  DATABASE_PORT: Env.schema.number.optional(),
  DATABASE_USER: Env.schema.string.optional(),
  // divers
  HASH_DRIVER: Env.schema.enum.optional(Object.values(HashDriverName)),
  // oauth providers
  SPOTIFY_API_URL: Env.schema.string.optional(),
  SPOTIFY_CLIENT_ID: Env.schema.string(),
  SPOTIFY_CLIENT_SECRET: Env.schema.string(),
  SPOTIFY_CALLBACK_URL: Env.schema.string.optional({ format: 'url' }),
  SPOTIFY_SUCCESS_URL: Env.schema.string.optional({ format: 'url' }),
  // project
  BASE_API_URL: Env.schema.string({ format: 'url' }),
})
