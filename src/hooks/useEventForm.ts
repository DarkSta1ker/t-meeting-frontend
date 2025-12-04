import {useState, useCallback} from 'react';
import {Event, NewEvent} from "../shared/types/event";
import {EventBaseField, EventMetadataField} from "../shared/types/event";
import {defaultEvent, defaultNewEvent} from "../shared/constants/constants";

export const useEventForm = (eventId?: string) => {
    let defaultFormNeeded:Event|NewEvent;
    if (eventId){
        defaultFormNeeded = defaultEvent;

    }
    else{
        defaultFormNeeded = defaultNewEvent;
    }
    const [eventData, setEventData] = useState(defaultFormNeeded);
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