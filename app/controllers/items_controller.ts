import Item from '#models/item'
import type { HttpContext } from '@adonisjs/core/http'

export default class ItemsController {
  /**
   * Display a list of resource
   */
  async index({ response, auth }: HttpContext) {
    try {
      // Memeriksa apakah pengguna sudah login
      await auth.check()
      const userId = auth.user?.id

      if (userId === undefined) {
        return response.status(401).send({ message: 'You must login to access this resource' })
      }

      // Mengambil semua data Item dari database
      const items = await Item.findManyBy('user_id', userId)

      // Mengembalikan respons dengan data items
      return response.status(200).send(items)
    } catch (error) {
      // Menangani kesalahan jika gagal mengambil data
      console.error(error)
      return response.status(500).send({ message: 'Failed to fetch items', error: error.message })
    }
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()

      // Menyimpan data baru ke dalam tabel Item
      const item = await Item.create(data)

      // Mengembalikan respons sukses dengan data item yang baru dibuat
      return response.status(201).send({ message: 'Item created successfully', data: item })
    } catch (error) {
      // Menangani kesalahan jika gagal menyimpan data
      console.error(error)
      return response.status(500).send({ message: 'Failed to create item', error: error.message })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response, auth }: HttpContext) {
    try {
      // Memeriksa apakah pengguna sudah login
      await auth.check()
      const userId = auth.user?.id

      if (userId === undefined) {
        return response.status(401).send({ message: 'You must login to access this resource' })
      }

      // Mengambil data Item dari database
      const { id } = params
      const item = await Item.query()
        .where('user_id', userId ?? '')
        .andWhere('id', id)
        .firstOrFail()

      // Mengembalikan respons sukses dengan data item yang ditemukan
      return response.status(200).send(item)
    } catch (error) {
      // Menangani kesalahan jika gagal menemukan data
      console.error(error)
      return response.status(404).send({ message: 'Failed to fetch item', error: error.message })
    }
  }

  /**
   * Edit individual record
   */
  async edit({}: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const { id } = params
      const item = await Item.findOrFail(id)
      const data = request.body()

      // Mengupdate data item dengan data baru
      item.merge(data)
      await item.save()

      // Mengembalikan respons sukses dengan data item yang diperbarui
      return response.status(200).send({ message: 'Item updated successfully', data: item })
    } catch (error) {
      // Menangani kesalahan jika gagal mengupdate data
      console.error(error)
      return response.status(500).send({ message: 'Failed to update item', error: error.message })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const { id } = params
      const item = await Item.findOrFail(id)

      // Lakukan operasi penghapusan item sesuai kebutuhan
      await item.delete()

      return response.status(200).send({ message: `Item with id ${id} deleted successfully` })
    } catch (error) {
      console.error(error)
      return response.status(500).send({ message: 'Failed to delete item' })
    }
  }
}
