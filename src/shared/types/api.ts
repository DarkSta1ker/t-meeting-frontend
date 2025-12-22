export interface ApiData<T = Record<string, unknown>> {
    url: string;
    method: string;
    payload?: T;
}

export interface ResultSuccess<T> {
    status: 'Success';
    payload: T;
}

export interface ResultError {
    status: 'Error';
    payload: unknown;
}
