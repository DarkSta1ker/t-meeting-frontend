import React, {type FC, useCallback, useState} from "react";
import {Header} from "../../widgets/Header/Header";
import {TextBlock} from "../../shared/blocks/TextBlock/TextBlock";
import {Button} from "../../shared/ui/Button/Button";
import { useNavigate } from 'react-router-dom';
import styles from './CreateEventPage.module.css';
import {useEvent} from "../../hooks/UseEvent";
import {EventForm} from "../../widgets/EventForm/EventForm";
import {useEventData} from "../../hooks/UseEventData";

export const CreateEventPage: FC = () => {

    const nav=useNavigate();
    const {addEvent, isLoading} = useEvent();
    const {eventData, handleTextAreaChange, handleInputChange}=useEventData();

    const handleAddEvent = useCallback(async ()=>{
        const resp = await addEvent(eventData);
        if (resp.status === "Success") {
            nav('/eventsList');
        }
        else{
            console.log(`${resp.status} | ${resp.payload}`);
        }
    },[addEvent, eventData,nav])

    const handleCancel = useCallback(() => {
        nav('/eventsList');
    }, [nav]);

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

