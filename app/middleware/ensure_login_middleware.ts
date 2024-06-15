import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class EnsureLoginMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    const { auth, response } = ctx

    try {
      // Memeriksa apakah pengguna sudah login
      await auth.check()
      const userId = auth.user?.id

      if (userId === undefined) {
        throw new Error('You must login with valid account to access this resource')
        // return response.unauthorized({
        //   message: 'You must login with valid account to access this resource',
        // })
      }

      /**
       * Call next method in the pipeline and return its output
       */
      await next()
    } catch (error) {
      return response.unauthorized({
        messages: error.message,
      })
    }
  }
}
