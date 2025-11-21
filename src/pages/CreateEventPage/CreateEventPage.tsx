import React, {type FC, useCallback, useState} from "react";
import {Header} from "../../widgets/Header/Header";
import {TextBlock} from "../../shared/blocks/TextBlock/TextBlock";
import {Button} from "../../shared/ui/Button/Button";
import { useNavigate } from 'react-router-dom';
import styles from './CreateEventPage.css';
import {useEvent} from "../../hooks/UseEvent";
import {Event} from '../../shared/eventServiceTypes/EventServiceTypesAndInterfaces';
import {EventForm} from "../../widgets/EventForm/EventForm";

export const CreateEventPage: FC = () => {

    const nav=useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const {addEvent} = useEvent();

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

    const handleAddEvent = useCallback(async ()=>{
        setIsLoading(true);
        try{
            const resp = await addEvent(eventData);
            if (resp.status === "Success") {
                nav('/eventsList');
            }
            else{
                console.log(`${resp.status} | ${resp.payload}`);
            }
        }
        finally{
            setIsLoading(false);
        }
    },[])

    const handleCancel = useCallback(()=>{
        nav('/eventsList');
    },[]);

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

    return (
        <div className={styles.createEventPage}>
            <Header button1={()=>nav(-1)} button2={()=>nav('/personalAccount')}/>
            <div className={styles.board}>
                <TextBlock className={styles.createPageTextBlock}>Создание мероприятия</TextBlock>
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
                        className={styles.saveButton}
                        disabled={isLoading}
                        onClick={handleAddEvent}>
                        {isLoading ? 'Отправка...' : 'Отправить'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

