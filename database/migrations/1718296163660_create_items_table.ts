import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.string('name').notNullable()
      table.integer('quantity').notNullable()
      table.enu('measuring_unit', ['lt', 'kg', 'pcs', 'box', 'roll', 'pack', 'sheet']).notNullable()
      table.uuid('user_id').notNullable().references('users.id').onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
