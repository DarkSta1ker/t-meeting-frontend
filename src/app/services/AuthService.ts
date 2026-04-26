import {createApiClient} from '../../api/requestor'; // не моки
//import {createMockApiClient} from '../../shared/mocks/authMocks'; //моки
import {AuthData, UserData} from '../../shared/types/auth';

const authApi = createApiClient('http://localhost:33/auth');//не моки
//const authApi = createMockApiClient();//моки
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
