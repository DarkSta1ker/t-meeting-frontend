import {useState, useCallback, useEffect} from 'react';
import {EventBaseField, EventListItem, EventMetadataField, EventNew} from "../shared/types/event";
import {defaultEvent} from "../shared/constants/constants";
import {EventService} from "../app/services/EventService";
import {useEvent} from './useEvent'

export const useEventForm = (eventId?:string) => {
    const {getEvent} = useEvent();
    const [eventData, setEventData] = useState<EventListItem|EventNew>(defaultEvent);

    useEffect(() => {
        if(!eventId){
            setEventData(defaultEvent)
            return;
        }
        const loadEvent = async()=>{
            const result = await getEvent(eventId);
            if(result.status==="Success"){
                console.log("Event loaded");
                setEventData(result.payload);
            }
            else{
                console.log(`Error ${result.payload}`);
            }
        }
        loadEvent();
    },[eventId, getEvent])


    const handleBaseFieldChange = useCallback((field: EventBaseField, value: string) => {
        setEventData(prev => ({
            ...prev,
            [field]: value
        }));
    }, [setEventData]);

    const handleMetadataFieldChange = useCallback((field: EventMetadataField, value: string) => {
        setEventData(prev =>({
            ...prev,
            metadata:{
                ...prev.metadata,
                [field]:value
            }
        }))
    }, [setEventData]);

    const handleTextAreaChange =useCallback((field:string, value:string)=>{
        setEventData(prev =>({
            ...prev,
            content: [
                ...prev.content.map(contentBlock=> contentBlock.block===field ? {...contentBlock, payload:[value]} : contentBlock)
            ]
        }));
    },[setEventData]);

    const resetForm = useCallback(() => {
        setEventData(defaultEvent);
    }, []);

    return{
        eventData,
        setEventData,
        handleBaseFieldChange,
        handleMetadataFieldChange,
        handleTextAreaChange,
        resetForm
    }
}