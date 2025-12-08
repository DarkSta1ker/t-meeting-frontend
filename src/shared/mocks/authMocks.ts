import {createResultError} from "../../app/services/lib/createResultError";
import {createResultSuccess} from "../../app/services/lib/createResultSuccess";
import {ResultError} from "../types/api";
import {ResultSuccess} from "../types/api";

interface LoginSuccessPayload {
    token: string;
    email: string;
}

const usersInDB = [
    {login: "login1", password: "password", token: "token1", email: "email1"},
    {login: "login2", password: "password", token: "token2", email: "email2"},
    {login: "login3", password: "password", token: "token3", email: "email3"},
]

type LoginResult = ResultSuccess<LoginSuccessPayload>| ResultError;

export const mockLoginUser = (login: string, password: string):Promise<LoginResult> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            for(const person of usersInDB) {
                if(person.login === login && person.password === password) {
                    resolve(createResultSuccess({
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