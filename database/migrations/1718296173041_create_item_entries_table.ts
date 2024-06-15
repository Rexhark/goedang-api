import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'item_entries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.uuid('item_id').notNullable().references('items.id').onDelete('CASCADE')
      table.enu('in_out', ['in', 'out']).notNullable()
      table.integer('quantity').notNullable()
      table.integer('price').notNullable()
      table.integer('total').notNullable()
      table.uuid('user_id').notNullable().references('users.id').onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
