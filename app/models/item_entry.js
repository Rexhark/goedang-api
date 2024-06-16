var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DateTime } from 'luxon';
import { BaseModel, afterSave, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm';
import User from './user.js';
import Item from './item.js';
import { randomUUID } from 'node:crypto';
import db from '@adonisjs/lucid/services/db';
export default class ItemEntries extends BaseModel {
    static selfAssignPrimaryKey = true;
    static assignUuid(itemEntry) {
        itemEntry.id = randomUUID();
    }
    static async updateItemQuantity(itemEntry) {
        const totalQuantity = await ItemEntries.query()
            .where('item_id', itemEntry.itemId)
            .select(db.raw("sum(case when in_out = 'in' then quantity else -quantity end) as total"))
            .first();
        if (totalQuantity !== null) {
            await Item.query().where('id', itemEntry.itemId).update({ quantity: totalQuantity.total });
        }
    }
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", String)
], ItemEntries.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], ItemEntries.prototype, "itemId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], ItemEntries.prototype, "inOut", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], ItemEntries.prototype, "quantity", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], ItemEntries.prototype, "price", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], ItemEntries.prototype, "total", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], ItemEntries.prototype, "userId", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], ItemEntries.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], ItemEntries.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Item),
    __metadata("design:type", Object)
], ItemEntries.prototype, "item", void 0);
__decorate([
    belongsTo(() => User),
    __metadata("design:type", Object)
], ItemEntries.prototype, "user", void 0);
__decorate([
    beforeCreate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ItemEntries]),
    __metadata("design:returntype", void 0)
], ItemEntries, "assignUuid", null);
__decorate([
    afterSave(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ItemEntries]),
    __metadata("design:returntype", Promise)
], ItemEntries, "updateItemQuantity", null);
//# sourceMappingURL=item_entry.js.map