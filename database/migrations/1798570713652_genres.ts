import BaseSchema from '@ioc:Adonis/Lucid/Schema'
// "genres": [
//   "pakistani indie",
//   "pakistani pop",
//   "urdu hip hop"
// ],
export default class extends BaseSchema {
  protected tableName = 'genres'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('artist_id').references('id').inTable('artists').onDelete('CASCADE')

      table.string('name')

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
