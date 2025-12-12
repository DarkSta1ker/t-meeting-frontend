import {useCallback} from 'react';
import { EventNew, EventListItem} from "../shared/types/event";
import {EventService} from "../app/services/EventService";
import {useEvents} from "./useEvents";

export const useEvent=() => {
    const {isLoading, setIsLoading} = useEvents();
    const addEvent = useCallback(async(event:EventNew)=>{
        setIsLoading(true);
        const response = await EventService.addEvent(event);
        setIsLoading(false);
        return response;
    },[setIsLoading]);

    const getEvent = useCallback(async(eventId:string)=>{
        setIsLoading(true);
        const response = await EventService.getEvent(eventId);
        setIsLoading(false);
        return response;
    },[setIsLoading]);


    const deleteEvent = useCallback(async(eventId:string)=>{
        setIsLoading(true);
        const response = await EventService.deleteEvent(eventId);
        setIsLoading(false);
        return response;
    },[setIsLoading]);

    const updateEvent = useCallback(async(event:EventListItem)=>{
        setIsLoading(true);
        const response = await EventService.updateEvent(event);
        setIsLoading(false);
        return response;
    },[setIsLoading]);

    const changeStatus = useCallback(async(eventId:string)=>{
        setIsLoading(true);
        const eventFromResponse = await getEvent(eventId);
        if(eventFromResponse.status==='Success'){
            const event = eventFromResponse.payload
            event.status = event.status==='draft'? 'published':'draft';
            try{
                const response=await updateEvent(event);
                if(response.status==='Success'){
                    console.log('Статус мероприятия обновлен');
                }
                else{
                    console.log(`Произошла ошибка ${response.payload}`);
                }
            }
            catch(err){
                console.log('Произошла ошибка при попытке обновления мероприятия')
            }
        }
        else{
            console.log('Произошла ошибка при попытке запросить мероприятие')
        }
        setIsLoading(false);

    },[setIsLoading, getEvent, updateEvent]);

    return {
        addEvent,
        getEvent,
        deleteEvent,
        updateEvent,
        changeStatus,
        isLoading
    }
}