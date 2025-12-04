export type ApiData<T = Record<string, unknown>> = {
    url: string;
    method: string;
    payload?: T;
}

export type ResultSuccess<T> = {
    status: 'Success';
    payload: T;
}

export type ResultError = {
    status: 'Error';
    payload: unknown;
}