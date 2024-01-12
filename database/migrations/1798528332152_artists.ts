import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'artists'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.string('user_id').references('id').inTable('users').onDelete('CASCADE')

      /* user => track || null */
      table.string('type')

      table.string('name')
      table.string('popularity')
      table.string('followers')
      table.string('uri')
      table.string('spotify_artist_id')
      table.string('artist_image')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
