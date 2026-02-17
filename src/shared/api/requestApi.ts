import {ApiData} from '../types/api';

export const requestApi = async <T>(data: ApiData<T>): Promise<Response> => {
    const fetchOptions: RequestInit = {
        body: data.payload ? JSON.stringify(data.payload) : undefined,
        headers: {'Content-Type': 'application/json'},
        method: data.method
    };
    const response = await fetch(data.url, fetchOptions);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
};
