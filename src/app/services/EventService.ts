import { EventBase, EventListItem} from "../../shared/types/event";
import {requestApi} from "../../shared/api/requestApi";
import {createResultError} from "./lib/createResultError";
import {createResultSuccess} from "./lib/createResultSuccess";
import {ApiData} from "../../shared/types/api";
import {mockRequestApi} from "../../shared/mocks/eventsMocks";

export const EventService = {
    async addEvent(eventPayload: EventBase){
        try{
            const apiData:ApiData<EventBase>={
                url : "/api/event",
                method : "POST",
                payload : eventPayload
            }
            const response = await mockRequestApi(apiData);
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
            const response = await mockRequestApi(apiData);
            if (!response.ok){
                return createResultError(new Error(`HTTP Error: ${response.ok} ${response.statusText}`));
            }
            const payload:EventListItem = await response.json();
            return createResultSuccess<EventListItem>(payload);
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
            const response = await mockRequestApi(apiData);
            if (!response.ok){
                return createResultError(new Error(`HTTP Error: ${response.ok} ${response.statusText}`));
            }
            const payload:EventListItem[] = await response.json();
            return createResultSuccess<EventListItem[]>(payload);
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
            const response = await mockRequestApi(apiData);
            if (!response.ok){
                return createResultError(new Error(`HTTP Error: ${response.ok} ${response.statusText}`));
            }
            return createResultSuccess(response);
        }
        catch(error){
            return createResultError(error);
        }
    },
    async updateEvent(eventPayload: EventListItem){
        try{
            const apiData:ApiData<EventListItem>={
                url : `/api/event/${eventPayload.id}`,
                method : "PUT",
                payload : eventPayload
            }
            const response = await mockRequestApi(apiData)
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

