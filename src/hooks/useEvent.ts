import {useReducer, useCallback, useEffect, useState} from 'react';
import {Event} from "../shared/types/event";
import {Action} from "../shared/types/actions";
import {EventsState} from "../shared/types/event";
import {EventService} from "../app/services/Service";

const reducer= (state:EventsState,action:Action):EventsState=>{
    switch(action.type){
        case 'AddEvent':
            return{
                ...state,
                events: [...state.events, action.payload]
            }
        case 'SetEvent':
            return{
                ...state,
                events: state.events.map(event=>
                    (event.id===action.payload.id)? action.payload : event
                )
            }
        case 'SetEvents':
            return{
                events: action.payload
            }
        case 'DeleteEvent':
            return{
                ...state,
                events: state.events.filter(event=> event.id!==action.payload)
            }

    }
}
const initialState: EventsState = {
    events: [],
};



export const useEvent=() => {
    const [state, dispatch] = useReducer(reducer,initialState);
    const [isLoading, setIsLoading] = useState(false);
    const addEvent = useCallback(async(event:Event)=>{
        setIsLoading(true);
        const result = await EventService.addEvent(event);
        if (result.status==='Success'){
            dispatch({ type: 'AddEvent', payload: event });
        }
        setIsLoading(false);
        return result;
    },[dispatch]);

    const getEvent = useCallback(async(eventId:string)=>{
        setIsLoading(true);
        const result = await EventService.getEvent(eventId);
        setIsLoading(false);
        return result;
    },[]);

    const getAllEvents = useCallback(async()=>{
        setIsLoading(true);
        const result = await EventService.getAllEvents();
        if (result.status==='Success'){
            dispatch({type:'SetEvents',payload:result.payload});
        }
        setIsLoading(false);
        return result;
    },[dispatch]);

    const deleteEvent = useCallback(async(eventId:string)=>{
        setIsLoading(true);
        const result = await EventService.deleteEvent(eventId);
        if (result.status==='Success'){
            dispatch({type:'DeleteEvent',payload:`${eventId}`})
        }
        setIsLoading(false);
        return result;
    },[dispatch]);

    const updateEvent = useCallback(async(event:Event)=>{
        setIsLoading(true);
        const result = await EventService.updateEvent(event);
        if (result.status==='Success'){
            dispatch({type:'SetEvent',payload:event});
        }
        setIsLoading(false);
        return result;
    },[dispatch]);

    useEffect(() => {
        getAllEvents();
    }, []);

    return {
        events: state.events,
        addEvent,
        getEvent,
        deleteEvent,
        updateEvent,
        getAllEvents,
        isLoading
    }
}