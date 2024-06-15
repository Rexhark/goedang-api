import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, afterSave, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import Item from './item.js'
import { randomUUID } from 'node:crypto'
import db from '@adonisjs/lucid/services/db'

export default class ItemEntries extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare itemId: number

  @column()
  declare inOut: string

  @column()
  declare quantity: number

  @column()
  declare price: number

  @column()
  declare total: number

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Item)
  declare item: BelongsTo<typeof Item>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @beforeCreate()
  static assignUuid(itemEntry: ItemEntries) {
    itemEntry.id = randomUUID()
  }

  @afterSave()
  static async updateItemQuantity(itemEntry: ItemEntries) {
    const totalQuantity = await ItemEntries.query()
      .where('item_id', itemEntry.itemId)
      .select(db.raw("sum(case when in_out = 'in' then quantity else -quantity end) as total"))
      .first()

    if (totalQuantity !== null) {
      await Item.query().where('id', itemEntry.itemId).update({ quantity: totalQuantity.total })
    }
  }
}
