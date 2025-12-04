import {Event, NewEvent} from "../../shared/types/event";
import {requestApi} from "../../shared/api/requestApi";
import {createResultError} from "./lib/createResultError";
import {createResultSuccess} from "./lib/createResultSuccess";
import {ApiData} from "../../shared/types/api";

export const EventService = {
    async addEvent(eventPayload: NewEvent){
        try{
            const apiData:ApiData<NewEvent>={
                url : "/api/event",
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
                url : `/api/event/${eventId}`,
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
                url : "/api/events",
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
                url : `/api/event/${eventId}`,
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
                url : `/api/event/${eventPayload.id}`,
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

