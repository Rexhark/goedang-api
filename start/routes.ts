/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router
  .group(() => {
    // Item
    router.get('/items', '#controllers/items_controller.index')
    router.post('/items', '#controllers/items_controller.store')
    router.get('/items/:id', '#controllers/items_controller.show')
    router.put('/items/:id', '#controllers/items_controller.update')
    router.delete('/items/:id', '#controllers/items_controller.destroy')
    // Item Entries
    router.get('/item_entries', '#controllers/item_entries_controller.index')
    router.post('/item_entries', '#controllers/item_entries_controller.store')
    router.get('/item_entries/:id', '#controllers/item_entries_controller.show')
    router.put('/item_entries/:id', '#controllers/item_entries_controller.update')
    router.delete('/item_entries/:id', '#controllers/item_entries_controller.destroy')
    // Get Current User
    router.get('/me', '#controllers/auth_controller.me').as('auth.me')
  })
  .use(middleware.ensureLogin())

// Login & Register
router.post('/register', '#controllers/auth_controller.register').as('auth.register')
router.post('/login', '#controllers/auth_controller.login').as('auth.login')
router
  .delete('/logout', '#controllers/auth_controller.logout')
  .as('auth.logout')
  .use(middleware.auth())
