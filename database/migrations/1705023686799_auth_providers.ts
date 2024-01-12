import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'auth_providers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('name')
      table.string('provider_user_id').notNullable().unique()
      table.string('access_token', 255).notNullable().unique()
      table.string('refresh_token', 255).notNullable().unique()
      table.string('type').notNullable()
      table.integer('expires_in')
      table.timestamp('expires_at')
      table.string('user_id').references('id').inTable('users').onDelete('CASCADE')

      table.primary(['name', 'user_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
