export interface ApiData<T> {
    url: string;
    method: string;
    payload?: T;
}

export interface ResultSuccess<T> {
    status: 'Success';
    payload: T;
}

export interface ResultError<T> {
    status: 'Error';
    payload: T;
}

export type HTTPMethods =
    | 'POST' | 'GET' | 'PUT'
    | 'DELETE' | 'HEAD' | 'PATCH'
    | 'get' | 'post' | 'put'
    | 'delete' | 'head' | 'patch'
