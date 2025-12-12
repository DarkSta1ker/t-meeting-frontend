import {createResultError} from "./lib/createResultError";
import {mockLoginUser} from "../../shared/mocks/authMocks";
import {AuthData} from "../../shared/types/auth";
import {createResultSuccess} from "./lib/createResultSuccess";


export const AuthService = {
    async loginUser(authData:AuthData) {
        try {
            const response = await mockLoginUser(authData.login, authData.password);
            if (response.status === 'Error') {
                return createResultError(response.payload);
            }
            return createResultSuccess(response.payload);
        } catch (error) {
            return createResultError(error);
        }
    }
}