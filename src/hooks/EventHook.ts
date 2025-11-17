import {useReducer, useCallback} from 'react';
import {Action, EventsState, Event} from "../shared/eventServiceTypes/EventServiceTypesAndInterfaces";
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
export const useEventHook=() => {
    const [state, dispatch] = useReducer(reducer,initialState);

    const addEvent = useCallback(async(event:Event)=>{
        const result = await EventService.addEvent(event);
        if (result.status==='Success'){
            dispatch({ type: 'AddEvent', payload: event });
        }
        return result;
        },[]);

    const getEvent = useCallback(async(eventId:string)=>{
        return await EventService.getEvent(eventId);
    }, []);

    const getAllEvents = useCallback(async()=>{
        const result = await EventService.getAllEvents();
        if (result.status==='Success'){
            dispatch({type:'SetEvents',payload:result.payload});
        }
        return result;
    },[]);

    const deleteEvent = useCallback(async(eventId:string)=>{
        const result = await EventService.deleteEvent(eventId);
        if (result.status==='Success'){
            dispatch({type:'DeleteEvent',payload:`${eventId}`})
        }
        return result;
    },[]);

    const updateEvent = useCallback(async(event:Event)=>{
        const result = await EventService.updateEvent(event);
        if (result.status==='Success'){
            dispatch({type:'SetEvent',payload:event});
        }
        return result;
    },[]);
    return {
        events: state.events,
        addEvent,
        getEvent,
        deleteEvent,
        updateEvent,
        getAllEvents
    }
}