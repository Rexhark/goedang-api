import ItemEntries from '#models/item_entry';
export default class ItemEntriesController {
    async index({ response, auth, request }) {
        try {
            await auth.check();
            const userId = auth.user?.id;
            if (userId === undefined) {
                return response.status(401).send({ message: 'You must login to access this resource' });
            }
            let entries = await ItemEntries.findManyBy('user_id', userId);
            const inOut = request.qs().inOut;
            if (inOut) {
                entries = entries.filter((entry) => entry.inOut === inOut);
            }
            return response.status(200).send(entries);
        }
        catch (error) {
            console.error(error);
            return response.status(500).send({ message: 'Failed to fetch entries', error: error.message });
        }
    }
    async create({}) { }
    async store({ request, response }) {
        try {
            const data = request.body();
            const entry = await ItemEntries.create(data);
            return response.status(201).send({ message: 'Entry created successfully', data: entry });
        }
        catch (error) {
            console.error(error);
            return response.status(500).send({ message: 'Failed to create entry', error: error.message });
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
            const entry = await ItemEntries.query()
                .where('user_id', userId ?? '')
                .andWhere('id', id)
                .firstOrFail();
            return response.status(200).send(entry);
        }
        catch (error) {
            console.error(error);
            return response.status(404).send({ message: 'Entry not found', error: error.message });
        }
    }
    async edit({}) { }
    async update({ params, request, response }) {
        try {
            const { id } = params;
            const entry = await ItemEntries.findOrFail(id);
            const data = request.body();
            entry.merge(data);
            await entry.save();
            return response.status(200).send({ message: 'Entry updated successfully', data: entry });
        }
        catch (error) {
            console.error(error);
            return response.status(500).send({ message: 'Failed to update entry', error: error.message });
        }
    }
    async destroy({ params, response }) {
        try {
            const { id } = params;
            const entry = await ItemEntries.findOrFail(id);
            await entry.delete();
            return response.status(200).send({ message: `Entry with id ${id} deleted successfully` });
        }
        catch (error) {
            console.error(error);
            return response.status(500).send({ message: 'Failed to delete entry', error: error.message });
        }
    }
}
//# sourceMappingURL=item_entries_controller.js.map