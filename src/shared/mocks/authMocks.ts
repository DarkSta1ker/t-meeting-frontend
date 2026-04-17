import {AuthData} from '../types/auth';

type HTTPMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface MockUser {
    id: number;
    email: string;
    password: string;
}

interface MockToken {
    accessToken: string;
    refreshToken: string;
    userId: number;
}

const users: MockUser[] = [
    {id: 1, email: 'email1', password: 'password'},
    {id: 2, email: 'email2', password: 'password'},
];

let currentToken: MockToken | null = null;

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

const generateToken = (userId: number): MockToken => ({
    accessToken: 'access_' + Math.random().toString(36),
    refreshToken: 'refresh_' + Math.random().toString(36),
    userId,
});

export const createMockApiClient = () => {
    return async <T>(
        endpoint: string,
        options: { method: HTTPMethods; body?: any }
    ): Promise<T> => {
        await delay();

        if (endpoint === '/login' && options.method === 'POST') {
            const {email, password} = options.body as AuthData;

            const user = users.find(
                (u) => u.email === email && u.password === password
            );

            if (!user) {
                throw {status: 401, message: 'Invalid credentials'};
            }

            currentToken = generateToken(user.id);

            return {
                accessToken: currentToken.accessToken,
                refreshToken: currentToken.refreshToken,
            } as T;
        }

        if (endpoint === '/register' && options.method === 'POST') {
            const {email, password} = options.body as AuthData;

            const exists = users.find((u) => u.email === email);
            if (exists) {
                throw {status: 400, message: 'User already exists'};
            }

            const newUser: MockUser = {
                id: users.length + 1,
                email,
                password,
            };

            users.push(newUser);

            currentToken = generateToken(newUser.id);

            return {
                accessToken: currentToken.accessToken,
                refreshToken: currentToken.refreshToken,
            } as T;
        }

        if (endpoint === '/refresh' && options.method === 'POST') {
            if (!currentToken) {
                throw {status: 401, message: 'No refresh token'};
            }

            currentToken = generateToken(currentToken.userId);

            return {
                accessToken: currentToken.accessToken,
                refreshToken: currentToken.refreshToken,
            } as T;
        }

        throw {status: 404, message: 'Endpoint not found'};
    };
};
