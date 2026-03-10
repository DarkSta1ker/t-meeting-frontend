import request, {Context, Next} from '@tinkoff/request-core';
import http from '@tinkoff/request-plugin-protocol-http';
import {tokenManager} from './tokenManager';

const credentialsPlugin = {
    init(context: Context, next: Next) {
        const currentRequest = context.getRequest();
        if (!currentRequest.credentials) {
            context.setState({request: {...currentRequest, credentials: 'include'}});
        }
        next();
    }
};

export const createApiClient = (baseUrl: string) => {
    const makeRequest = request([
        credentialsPlugin,
        http(),
    ]);
    const requestWithAuth = async <T>(
        endpoint: string,
        options: Omit<RequestInit, 'body'> & { body?: any } = {}
    ): Promise<T> => {
        try {
            const result = await makeRequest({
                url: baseUrl + endpoint,
                headers: {'Content-Type': 'application/json', ...options.headers},
                method: options.method || 'GET',
                body: options.body ? JSON.stringify(options.body) : undefined,
            });
            return result;
        } catch (error: any) {
            if (error && error.status === 401) {
                try {
                    console.log('Trying refresh request');
                    await tokenManager.refreshToken();
                    const result = await makeRequest({
                        url: baseUrl + endpoint,
                        headers: {'Content-Type': 'application/json', ...options.headers},
                        method: options.method || 'GET',
                        body: options.body ? JSON.stringify(options.body) : undefined,
                    });
                    return result;
                } catch (refreshError) {

                }
            }
            throw error;
        }
    };
    return requestWithAuth;
};
