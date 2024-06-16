import Item from '#models/item';
export default class ItemsController {
    async index({ response, auth }) {
        try {
            await auth.check();
            const userId = auth.user?.id;
            if (userId === undefined) {
                return response.status(401).send({ message: 'You must login to access this resource' });
            }
            const items = await Item.findManyBy('user_id', userId);
            return response.status(200).send(items);
        }
        catch (error) {
            console.error(error);
            return response.status(500).send({ message: 'Failed to fetch items', error: error.message });
        }
    }
    async create({}) { }
    async store({ request, response }) {
        try {
            const data = request.body();
            const item = await Item.create(data);
            return response.status(201).send({ message: 'Item created successfully', data: item });
        }
        catch (error) {
            console.error(error);
            return response.status(500).send({ message: 'Failed to create item', error: error.message });
        }
    }
    async show({ params, response, auth }) {
        try {
            await auth.check();
            const userId = auth.user?.id;
            if (userId === undefined) {
                return response.status(401).send({ message: 'You must login to access this resource' });
            }
            const { id } = params;
            const item = await Item.query()
                .where('user_id', userId ?? '')
                .andWhere('id', id)
                .firstOrFail();
            return response.status(200).send(item);
        }
        catch (error) {
            console.error(error);
            return response.status(404).send({ message: 'Failed to fetch item', error: error.message });
        }
    }
    async edit({}) { }
    async update({ params, request, response }) {
        try {
            const { id } = params;
            const item = await Item.findOrFail(id);
            const data = request.body();
            item.merge(data);
            await item.save();
            return response.status(200).send({ message: 'Item updated successfully', data: item });
        }
        catch (error) {
            console.error(error);
            return response.status(500).send({ message: 'Failed to update item', error: error.message });
        }
    }
    async destroy({ params, response }) {
        try {
            const { id } = params;
            const item = await Item.findOrFail(id);
            await item.delete();
            return response.status(200).send({ message: `Item with id ${id} deleted successfully` });
        }
        catch (error) {
            console.error(error);
            return response.status(500).send({ message: 'Failed to delete item' });
        }
    }
}
//# sourceMappingURL=items_controller.js.map