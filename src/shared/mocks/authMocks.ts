import {ResultError, ResultSuccess} from '../types/api';

interface LoginSuccessPayload {
    token: string;
    login: string;
}

const usersInDB = [
    {login: 'login1', password: 'password', token: 'token1', email: 'email1'},
    {login: 'login2', password: 'password', token: 'token2', email: 'email2'},
    {login: 'login3', password: 'password', token: 'token3', email: 'email3'},
];

type LoginResult = ResultSuccess<LoginSuccessPayload> | ResultError<string>;

export const mockLoginUser = (login: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            for (const person of usersInDB) {
                if (person.email === login && person.password === password) {
                    resolve();
                    return;
                }
            }
            reject('Неправильный логин или пароль');
        }, 2000);
    });
};

export const mockGetUserData = (login: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            for (const person of usersInDB) {
                if (person.email === login && person.password === password) {
                    resolve();
                    return;
                }
            }
            reject('Неправильный логин или пароль');
        }, 2000);
    });
};
