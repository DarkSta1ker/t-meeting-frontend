import {ApiData} from "../types/api";

export const requestApi= async <T = Record<string, unknown>>(data:ApiData<T>): Promise<Response> => {
    const fetchOptions:RequestInit = {
        method:data.method,
        headers:{"Content-Type":"application/json"},
        body: data.payload? JSON.stringify(data.payload) : undefined
    }
    const response = await fetch(data.url,fetchOptions);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
}
