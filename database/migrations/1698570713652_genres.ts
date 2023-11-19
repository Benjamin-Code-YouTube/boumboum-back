import BaseSchema from '@ioc:Adonis/Lucid/Schema'
// "genres": [
//   "pakistani indie",
//   "pakistani pop",
//   "urdu hip hop"
// ],
export default class extends BaseSchema {
  protected tableName = 'genres'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('artist_id')
        .unsigned()


      table.string('name')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
