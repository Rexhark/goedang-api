export default class EnsureLoginMiddleware {
    async handle(ctx, next) {
        const { auth, response } = ctx;
        try {
            await auth.check();
            const userId = auth.user?.id;
            if (userId === undefined) {
                throw new Error('You must login with valid account to access this resource');
            }
            await next();
        }
        catch (error) {
            return response.unauthorized({
                messages: error.message,
            });
        }
    }
}
//# sourceMappingURL=ensure_login_middleware.js.map