import {createResultError} from "../../app/services/lib/createResultError";
import {createResultSuccess} from "../../app/services/lib/createResultSuccess";
import {ResultError} from "../types/api";
import {ResultSuccess} from "../types/api";
import {LoginSuccessPayload} from "../types/auth";

const usersInDB = [
    {login: "login1", password: "password", token: "token1", email: "email1", role:"user"},
    {login: "login2", password: "password", token: "token2", email: "email2", role:"admin"},
    {login: "login3", password: "password", token: "token3", email: "email3", role:"user"},
]

type LoginResult = ResultSuccess<LoginSuccessPayload>| ResultError;

export const mockLoginUser = (login: string, password: string):Promise<LoginResult> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            for(const person of usersInDB) {
                if(person.login === login && person.password === password) {
                    resolve(createResultSuccess({
                        role: person.role,
                        token: person.token,
                        email: person.email
                    }));
                    return;
                }
            }
            resolve(createResultError(new Error("Invalid login or password")));
        }, 2000);
    });
}