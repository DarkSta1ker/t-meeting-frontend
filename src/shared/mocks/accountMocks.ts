import {createResultError} from "../../app/services/lib/createResultError";
import {createResultSuccess} from "../../app/services/lib/createResultSuccess";
import {ResultError, ResultSuccess} from "../types/api";
import {AccountData} from "../types/account";


const usersInDB = [
    {
        login: "login1",
        password: "password",
        token: "token1",
        email: "email1",
        role: "Администратор",
        avatar: process.env.PUBLIC_URL + "/images/AdminAvatar.jpg"
    },
    {
        login: "login2",
        password: "password",
        token: "token2",
        email: "email2",
        role: "Пользователь",
        avatar: process.env.PUBLIC_URL + "/images/UserAvatar.jpg"
    },
    {login: "login3", password: "password", token: "token3", email: "email3", role: "Неизвестный"},
]

type accountMockResult = ResultSuccess<AccountData> | ResultError;

export const mockAccountData = (login: string, token: string): Promise<accountMockResult> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            for (const person of usersInDB) {
                if (person.login === login && person.token === token) {
                    resolve(createResultSuccess({
                        login: person.login,
                        email: person.email,
                        role: person.role,
                        avatarPhoto: person?.avatar,
                    }));
                    return;
                }
            }
            resolve(createResultError(new Error("Нет соответствия почты и токена")));
        }, 2000);
    });
}