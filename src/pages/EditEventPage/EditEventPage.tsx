import React, {type FC, useCallback, useEffect} from "react";
import {Header} from "../../widgets/Header/Header";
import {TextBlock} from "../../shared/blocks/TextBlock/TextBlock";
import {Button} from "../../shared/ui/Button/Button";
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditEventPage.css';
import {useEvent} from "../../hooks/UseEvent";
import {EventForm} from "../../widgets/EventForm/EventForm";
import {useEventData} from "../../hooks/UseEventData";

export const EditEventPage: FC = () => {
    const nav=useNavigate();
    const { eventId } = useParams<{ eventId: string }>();
    const {getEvent, updateEvent, deleteEvent, isLoading} = useEvent();
    const {eventData, handleTextAreaChange, handleInputChange, setEventData}=useEventData();

    useEffect(()=>{
        const loadEvent = async()=>{
            if (!eventId){
                console.log("No eventId found");
                return;
            }
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
    },[getEvent, eventId, setEventData]);

    const handleUpdateEvent = useCallback(async ()=>{
        const result = await updateEvent(eventData);
        if(result.status==="Success"){
            console.log("Event updated");
            nav('/eventsList');
        }
        else{
            console.log(`Error ${result.payload}`);
        }
    },[updateEvent, eventData,nav]);

    const handleDeleteEvent= useCallback(async()=>{
        if (!eventId){
            console.log("No eventId found");
            return;
        }
        const result = await deleteEvent(eventId);
        if(result.status==="Success"){
            console.log("Event deleted");
            nav('/eventsList');
        }
        else{
            console.log(`Error ${result.payload}`);
        }
    },[deleteEvent, eventId, nav]);

    const handleCancel = useCallback(() => {
        nav('/eventsList');
    }, [nav]);

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

