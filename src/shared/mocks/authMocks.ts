import {createResultError} from "../../app/services/lib/createResultError";
import {createResultSuccess} from "../../app/services/lib/createResultSuccess";
import {ResultError} from "../../shared/types/api";
import {ResultSuccess} from "../../shared/types/api";

const usersInDB = [
    {login: "login1", password: "password", token: "token1"},
    {login: "login2", password: "password", token: "token2"},
    {login: "login3", password: "password", token: "token3"},
]
interface LoginSuccessPayload {
    role: string;
    token: string;
}
type LoginResult = ResultSuccess<LoginSuccessPayload>| ResultError;

export const mockLoginUser = (login: string, password: string):Promise<LoginResult> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            for(const person of usersInDB) {
                if(person.login === login && person.password === password) {
                    resolve(createResultSuccess({
                        role: 'user',
                        token: person.token
                    }));
                    return;
                }
            }
            resolve(createResultError(new Error("Invalid login or password")));
        }, 2000);
    });
}