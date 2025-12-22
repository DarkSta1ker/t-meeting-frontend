import {useCallback, useState} from 'react';
import {EventListItem} from "../shared/types/event";
import {EventService} from "../app/services/EventService";

export const useEvents = ()=> {
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState<EventListItem[]>([]);

    const getAllEvents = useCallback(async()=>{
        setIsLoading(true);
        const response = await EventService.getAllEvents();
        if (response.status==="Success"){
            setEvents(response.payload)
        }
        else{
            console.log(`Ошибка при выполнении handleGetAllEvents ${response.payload}`);
        }
        setIsLoading(false);
        return response;

    },[])


    return{
        events,
        setEvents,
        getAllEvents,
        isLoading,
        setIsLoading,
    }
}