/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import type { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'
import Env from '@ioc:Adonis/Core/Env'
import ConfigurationService from 'App/Services/ConfigurationService'

export enum DatabaseConnectionName {
  MY_SQL = 'mysql',
}

enum DatabaseConnectionDefaultPort {
  mysql = 3306,
}

Env.process()

const databaseConfig: DatabaseConfig = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
  connection: Env.get('DB_CONNECTION', DatabaseConnectionName.MY_SQL),

  connections: {
    /*
    |--------------------------------------------------------------------------
    | MySQL config
    |--------------------------------------------------------------------------
    |
    | Configuration for MySQL database. Make sure to install the driver
    | from npm when using this connection
    |
    | npm i mysql2
    |
    */
    [DatabaseConnectionName.MY_SQL]: {
      client: 'mysql2',
      connection: {
        host: Env.get('DATABASE_HOST', '0.0.0.0'),
        port: Env.get(
          'DATABASE_PORT',
          DatabaseConnectionDefaultPort[DatabaseConnectionName.MY_SQL]
        ),
        user: Env.get('DATABASE_USER', 'root'),
        password: Env.get('DATABASE_PASSWORD', ''),
        database: Env.get('DATABASE_NAME'),
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: ConfigurationService.isServerInDevMode(),
    },
  },
}

export default databaseConfig
