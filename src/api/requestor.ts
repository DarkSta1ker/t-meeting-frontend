import request, {Context, Next} from '@tinkoff/request-core';
import http from '@tinkoff/request-plugin-protocol-http';
import {ROUTES} from '../shared/constants/constants';
import {HTTPMethods} from '../shared/types/api';

const basename = process.env.PUBLIC_URL || '';
const authPath = ROUTES.AUTH === '/' ? '' : ROUTES.AUTH;
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

    window.location.href = `${basename}${authPath}?back=${backUrl}`;
};

const redirectPlugin = {
    error: (context: Context, next: Next) => {
        const error = context.getState().error;
        const req = context.getRequest();
        const url = (req.url as string) || '';
        
        const isAuthEndpoint = /\/(me|refresh|login|register)$/.test(url);

        if (error && error.status === 401 && !isAuthEndpoint) {
            const currentPath = window.location.pathname;
            if (!currentPath.endsWith(ROUTES.AUTH) && !window.location.href.endsWith(basename)) {
                redirectToLogin();
            }
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
        options: Omit<RequestInit, 'body' | 'method'> & { method: HTTPMethods, body?: any },
    ): Promise<T> => {
        const result = await makeRequest({
            url: baseUrl + endpoint,
            headers: {'Content-Type': 'application/json', ...options?.headers},
            httpMethod: options.method,
            payload: options.body,
            type: 'json'
        });
        return result;
    };
    return requestWithAuth;
};
