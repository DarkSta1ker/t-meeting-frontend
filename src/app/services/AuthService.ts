import {createApiClient} from '../../api/requestor';
import {AuthData, UserData} from '../../shared/types/auth';

const authApi = createApiClient('http://localhost:33/auth');

export const AuthService = {
    async loginUser(authData: AuthData) {
        return authApi('/login', {method: 'POST', body: authData});
    },

    async regUser(authData: AuthData) {
        return authApi('/register', {method: 'POST', body: authData});
    },

    async refresh() {
        return authApi('/refresh', {method: 'POST'});
    },

    async getUserData(): Promise<UserData> {
        return authApi('/me', {method: 'GET'});
    },
};
