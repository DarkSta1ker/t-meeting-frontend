import React, {useState, useCallback} from 'react';
import {Event} from "../shared/eventServiceTypes/EventServiceTypesAndInterfaces";
import styles from "../pages/EditEventPage/EditEventPage.css";
import {Input} from "../shared/ui/Input/Input";
import {TextArea} from "../shared/ui/TextArea/TextArea";

export const useEventData = (initialEvent?:Event) => {
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

    const handleInputChange = useCallback((paramName:string, payload:string)=>{
        switch(paramName){
            case "name":{
                setEventData(prev =>({
                    ...prev,
                    name:payload
                }))
                break;
            }
            case "datetime":{
                setEventData(prev =>({
                    ...prev,
                    metadata:{
                        ...prev.metadata,
                        datetime:payload
                    }
                }))
                break;
            }
            case "location":{
                setEventData(prev =>({
                    ...prev,
                    metadata:{
                        ...prev.metadata,
                        location:payload
                    }
                }))
                break;
            }
        }
    },[setEventData]);

    const handleTextAreaChange =useCallback((paramName:string, payload:string)=>{
        switch(paramName){
            case("promotext"):{
                setEventData(prev =>({
                    ...prev,
                    content: [
                        ...prev.content.map(contentBlock=> contentBlock.block===paramName ? {...contentBlock, payload:[payload]} : contentBlock)
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
        handleInputChange,
        handleTextAreaChange,
        resetForm
    }
}