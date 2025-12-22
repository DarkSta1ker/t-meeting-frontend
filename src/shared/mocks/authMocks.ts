import {createResultError} from '../../app/services/lib/createResultError';
import {createResultSuccess} from '../../app/services/lib/createResultSuccess';
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

type LoginResult = ResultSuccess<LoginSuccessPayload> | ResultError;

export const mockLoginUser = (login: string, password: string): Promise<LoginResult> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            for (const person of usersInDB) {
                if (person.login === login && person.password === password) {
                    resolve(createResultSuccess({
                        token: person.token,
                        login: person.login,
                    }));
                    return;
                }
            }
            resolve(createResultError('Неправильный логин или пароль'));
        }, 2000);
    });
};
