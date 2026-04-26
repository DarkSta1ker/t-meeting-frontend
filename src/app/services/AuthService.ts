//import {createApiClient} from '../../api/requestor';
import {createMockApiClient} from '../../shared/mocks/authMocks';
import {AuthData, UserData} from '../../shared/types/auth';

//const authApi = createApiClient('http://localhost:33/auth');
const authApi = createMockApiClient();
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
