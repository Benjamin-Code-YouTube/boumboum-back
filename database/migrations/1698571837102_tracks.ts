import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "tracks";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.integer("user_id").unsigned();

      table.string("name");
      table.string("uri");
      table.string("popularity");
      table.string("track_image");
      table.string("track_id");
      table.string("album");
      table.tinyint('favorite').defaultTo(0)
      
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
