import {createApiClient} from '../../api/requestor'; // не моки
//import {createMockApiClient} from '../../shared/mocks/authMocks'; //моки
import {AuthData, UserData} from '../../shared/types/auth';

const authApi = createApiClient('/api');//не моки
//const authApi = createMockApiClient();//моки
export const AuthService = {
    async loginUser(authData: AuthData) {
        return authApi('/auth/login', {method: 'POST', body: authData});
    },

    async regUser(authData: AuthData) {
        return authApi('/auth/register', {method: 'POST', body: authData});
    },

    async refresh() {
        return authApi('/auth/refresh', {method: 'POST'});
    },

    async getUserData(): Promise<UserData> {
        return authApi('/user', {method: 'GET'});
    },
};
