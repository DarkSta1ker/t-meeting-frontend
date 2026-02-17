import {mockAccountData} from "../../shared/mocks/accountMocks";
import {createResultError} from "./lib/createResultError";
import {createResultSuccess} from "./lib/createResultSuccess";

export const AccountService = {
    async getAccountInfo(login: string, token: string) {
        try {
            const result = await mockAccountData(login, token);
            if (result.status === "Error") {
                return createResultError(result.payload);
            }
            return createResultSuccess(result.payload);
        } catch (e) {
            return createResultError(e);
        }
    }
}