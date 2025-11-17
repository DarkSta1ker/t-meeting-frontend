import {
    Event,
    ApiData,
    ResultSuccess,
    ResultError,
} from '../../shared/eventServiceTypes/EventServiceTypesAndInterfaces';

const requestApi= async <T = Record<string, unknown>>(data:ApiData<T>): Promise<Response> => {
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

const createResultSuccess = <T>(payload: T):ResultSuccess<T> => {
    return{
        status: 'Success',
        payload: payload
    }
}

const createResultError = (error: unknown):ResultError => {
    return{
        status: 'Error',
        payload: error
    }
}

export const EventService = {
    async addEvent(eventPayload: Event){
        try{
            const apiData:ApiData<Event>={
                url : "/event",
                method : "POST",
                payload : eventPayload
            }
            const response = await requestApi(apiData);
            if(!response.ok){
                return createResultError(new Error(`HTTP Error: ${response.ok} ${response.statusText}`));
            }
            return createResultSuccess(response);
        }
        catch(error){
            return createResultError(error);
        }
    },
    async getEvent(eventId: string){
        try{
            const apiData:ApiData={
                url : `/event/${eventId}`,
                method : "GET",
            }
            const response = await requestApi(apiData);
            if (!response.ok){
                return createResultError(new Error(`HTTP Error: ${response.ok} ${response.statusText}`));
            }
            const payload:Event = await response.json();
            return createResultSuccess<Event>(payload);
        }
        catch(error){
            return createResultError(error);
        }
    },
    async getAllEvents(){
        try{
            const apiData:ApiData={
                url : "/events",
                method : "GET",
            }
            const response = await requestApi(apiData);
            if (!response.ok){
                return createResultError(new Error(`HTTP Error: ${response.ok} ${response.statusText}`));
            }
            const payload:Event[] = await response.json();
            return createResultSuccess<Event[]>(payload);
        }
        catch(error){
            return createResultError(error);
        }
    },
    async deleteEvent(eventId: string){
        try{
            const apiData:ApiData={
                url : `/event/${eventId}`,
                method : "DELETE",
            }
            const response = await requestApi(apiData);
            if (!response.ok){
                return createResultError(new Error(`HTTP Error: ${response.ok} ${response.statusText}`));
            }
            return createResultSuccess(response);
        }
        catch(error){
            return createResultError(error);
        }
    },
    async updateEvent(eventPayload: Event){
        try{
            const apiData:ApiData<Event>={
                url : `/event/${eventPayload.id}`,
                method : "PUT",
                payload : eventPayload
            }
            const response = await requestApi(apiData)
            if (!response.ok){
                return createResultError(new Error(`HTTP Error: ${response.ok} ${response.statusText}`));
            }
            return createResultSuccess(response);
        }
        catch(error){
            return createResultError(error);
        }
    }
}

