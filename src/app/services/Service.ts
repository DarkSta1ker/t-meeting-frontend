import {useReducer, useState} from 'react';


const FetchFabric= async (url:string,method:string,options?:Event): Promise<Response> => {
    const FetchOptions:RequestInit = {
        method:method,
        headers:{"Content-Type":"application/json"},
        body: options? JSON.stringify(options) : null
    }
    const response = await fetch(url,FetchOptions);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
}

interface Event{
    id?: "",
    name?: string,
    metadata?: {
        datetime?: string,
        location?: string
    },
    content?: EventContentBlock[]
}

type EventContentBlock = | PromoTextBlock

interface PromoTextBlock {
    block: "promotext";
    payload: string[];
}

interface EventsState{
    events: Event[];
}

type Action=
    | {type: "AddEvent", payload:Event}
    | {type: "SetEvent", payload:Event}
    | {type: "SetEvents", payload:Event[]}
    | {type: "DeleteEvent", payload:string}

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
export const CRUDService= ()=>{
    const [state, dispatch] = useReducer(reducer,initialState);
    const handleAddEvent = async (data: Event) => {
        try{
            const response = await FetchFabric("/event","POST",data)
            if (!response.ok){
                dispatch({type:'AddEvent',payload:data})
                console.log('Код ошибки', response.ok)
            }
            else{
                console.log('Запрос отправлен')
            }
        }
        catch(error){
            console.log(error)
        }
    }
    const handleGetEvent = async (data: Event) => {
        try{
            const response = await FetchFabric(`/event/${data.id}`,"GET")
            if (!response.ok){
                console.log('Код ошибки', response.ok)
            }
            else{
                console.log('Ответ получен')
                const eventData: Event = await response.json();
                return eventData;
            }
        }
        catch(error){
            console.log(error)
        }
    }

    const handleGetAllEvents = async () => {
        try{
            const response = await FetchFabric(`/events`,"GET")
            if (!response.ok){
                console.log('Код ошибки', response.ok)
            }
            else{
                console.log('Ответ получен')
                const eventsList : Event[] = await response.json()
                dispatch({type:'SetEvents',payload:eventsList})
            }
        }
        catch(error){
            console.log(error)
        }
    }


    const handleDeleteEvent = async (data: Event) => {
        try{
            const response = await FetchFabric(`/event/${data.id}`,"DELTE")
            if (!response.ok){
                console.log('Код ошибки', response.ok)
            }
            else{
                console.log('Запрос отправлен')
                dispatch({type:'DeleteEvent',payload:`${data.id}`})
            }
        }
        catch(error){
            console.log(error)
        }
    }


    const handleUpdateEvent = async (data: Event) => {
        try{
            const response = await FetchFabric(`/event/${data.id}`,"PUT", data)
            if (!response.ok){
                console.log('Код ошибки', response.ok)
            }
            else{
                console.log('Запрос отправлен')
                dispatch({type:'SetEvent',payload:data})
            }
        }
        catch(error){
            console.log(error)
        }
    }
}

