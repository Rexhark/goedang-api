import User from '#models/user';
import { loginValidator, registerValidator } from '#validators/auth';
export default class AuthController {
    async register({ request }) {
        const data = await request.validateUsing(registerValidator);
        const user = await User.create(data);
        return User.accessTokens.create(user);
    }
    async login({ request }) {
        const { email, password } = await request.validateUsing(loginValidator);
        const user = await User.verifyCredentials(email, password);
        return User.accessTokens.create(user);
    }
    async logout({ auth }) {
        const user = auth.user;
        await User.accessTokens.delete(user, user.currentAccessToken.identifier);
        return { message: 'success' };
    }
    async me({ auth, response }) {
        try {
            await auth.check();
            return {
                user: auth.user,
            };
        }
        catch (error) {
            return response.unauthorized({ message: 'You must be logged in to access this resource' });
        }
    }
}
//# sourceMappingURL=auth_controller.js.map