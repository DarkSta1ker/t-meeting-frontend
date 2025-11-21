import React, {type FC, useCallback, useState,useEffect} from "react";
import {Header} from "../../widgets/Header/Header";
import {TextBlock} from "../../shared/blocks/TextBlock/TextBlock";
import {Button} from "../../shared/ui/Button/Button";
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditEventPage.css';
import {useEvent} from "../../hooks/UseEvent";
import {Event} from "../../shared/eventServiceTypes/EventServiceTypesAndInterfaces";
import {EventForm} from "../../widgets/EventForm/EventForm";

export const EditEventPage: FC = () => {
    const nav=useNavigate();
    const { eventId } = useParams<{ eventId: string }>();
    const [isLoading, setIsLoading] = useState(false);
    const {getEvent, updateEvent, deleteEvent} = useEvent();
    const [eventData, setEventData] = useState<Event>({
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
    });

    const handleInputChange = (paramName:string, payload:string)=>{
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
    };

    const handleTextAreaChange = (paramName:string, payload:string)=>{
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
    };
    const handleGetEvent = useCallback(async ()=>{
        if (!eventId){
            console.log("No eventId found");
            return;
        }
        setIsLoading(true);
        try{
            const result = await getEvent(eventId);
            if(result.status==="Success"){
                console.log("Event loaded");
                setEventData(result.payload);
            }
            else{
                console.log(`Error ${result.payload}`);
            }
        }
        finally{
            setIsLoading(false);
        }
    },[]);

    const handleUpdateEvent = useCallback(async ()=>{
        setIsLoading(true);
        try{
            const result = await updateEvent(eventData);
            if(result.status==="Success"){
                console.log("Event updated");
            }
            else{
                console.log(`Error ${result.payload}`);
            }
        }
        finally{
            setIsLoading(false);
        }
    },[])

    const handleDeleteEvent= useCallback(async()=>{
        if (!eventId){
            console.log("No eventId found");
            return;
        }
        const result = await deleteEvent(eventId);
        if(result.status==="Success"){
            console.log("Event deleted");
        }
        else{
            console.log(`Error ${result.payload}`);
        }
    },[]);

    const handleCancel = useCallback(()=>{
        nav('/eventsList');
    },[]);

    useEffect(()=>{
        handleGetEvent();
    },[]);


    return (
        <div className={styles.editEventPage}>
            <Header button1={()=>nav(-1)} button2={()=>nav('/personalAccount')}/>
            <div className={styles.board}>
                <TextBlock className={styles.editPageTextBlock}>Редактирование мероприятия</TextBlock>
                {
                    isLoading? <div>Загрузка...</div> :
                    <EventForm eventData={eventData} InputChange={handleInputChange} TextAreaChange={handleTextAreaChange}/>
                }
                <div className={styles.buttonsBlock}>
                    <Button
                        className={styles.cancelButton}
                        onClick={handleCancel}>
                        Отмена
                    </Button>
                    <Button
                        className={styles.deleteButton}
                        onClick={handleDeleteEvent}>
                        {isLoading ? 'Отправка...' : 'Удалить'}
                    </Button>
                    <Button
                        className={styles.saveButton}
                        onClick={handleUpdateEvent}>
                        {isLoading ? 'Отправка...' : 'Сохранить'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

