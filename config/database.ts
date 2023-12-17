/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import type {DatabaseConfig} from '@ioc:Adonis/Lucid/Database'
import ConfigurationService, {DatabaseConfiguration} from "App/Services/ConfigurationService";

const DATABASE_CONFIG: DatabaseConfiguration = ConfigurationService.getDatabaseConfig()

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
  connection: DATABASE_CONFIG.connection,

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
    mysql: {
      client: 'mysql2',
      connection: {
        host: DATABASE_CONFIG.host,
        port: DATABASE_CONFIG.port,
        user: DATABASE_CONFIG.user,
        password: DATABASE_CONFIG.password,
        database: DATABASE_CONFIG.name,
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },

  }
}

export default databaseConfig
