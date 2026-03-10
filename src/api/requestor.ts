import request, {Context, Next} from '@tinkoff/request-core';
import http from '@tinkoff/request-plugin-protocol-http';
import {ROUTES} from '../shared/constants/constants';

const credentialsPlugin = {
    init: (context: Context, next: Next) => {
        const currentRequest = context.getRequest();
        if (!currentRequest.credentials) {
            context.setState({request: {...currentRequest, credentials: 'include'}});
        }
        next();
    }
};

const redirectToLogin = () => {
    const backUrl = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = `${ROUTES.AUTH}?back=${backUrl}`;
};

const redirectPlugin = {
    error: (context: Context, next: Next) => {
        const error = context.getState().error;
        if (error && error.status === 401) {
            redirectToLogin();
        }
        next();
    }
};

export const createApiClient = (baseUrl: string) => {
    const makeRequest = request([
        credentialsPlugin,
        redirectPlugin,
        http(),
    ]);
    const requestWithAuth = async <T>(
        endpoint: string,
        options: Omit<RequestInit, 'body'> & { body?: any } = {}
    ): Promise<T> => {
        const result = await makeRequest({
            url: baseUrl + endpoint,
            headers: {'Content-Type': 'application/json', ...options.headers},
            method: options.method || 'GET',
            body: options.body ? JSON.stringify(options.body) : undefined,
        });
        return result;
    };
    return requestWithAuth;
};
