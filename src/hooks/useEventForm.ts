import {useState, useCallback} from 'react';
import {Event} from "../shared/types/event";
import {EventBaseField, EventMetadataField} from "../shared/types/event";

export const useEventForm = (initialEvent?:Event) => {
    const defaultEvent:Event = {
        id: "",
        name: "",
        metadata: {
            datetime: "",
            location: ""
        },
        content: [
            {
                block: "promotext",
                payload: []
            }
        ]
    }
    const [eventData, setEventData] = useState<Event>(initialEvent||defaultEvent);


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
        switch(field){
            case("promotext"):{
                setEventData(prev =>({
                    ...prev,
                    content: [
                        ...prev.content.map(contentBlock=> contentBlock.block===field ? {...contentBlock, payload:[value]} : contentBlock)
                    ]
                }));
                break;
            }
        }
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