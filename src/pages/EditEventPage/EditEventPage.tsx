import React, {type FC, useCallback, useEffect} from "react";
import {TextBlock} from "../../shared/blocks/TextBlock/TextBlock";
import {Button} from "../../shared/ui/Button/Button";
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditEventPage.module.css';
import {useEvent} from "../../hooks/useEvent";
import {EventForm} from "../../widgets/EventForm/EventForm";
import {useEventForm} from "../../hooks/useEventForm";
import {Event} from "../../shared/types/event";

export const EditEventPage: FC = () => {
    const nav=useNavigate();
    const { eventId } = useParams<{ eventId: string }>();
    const {getEvent, updateEvent, deleteEvent, isLoading} = useEvent();
    const {eventData, handleTextAreaChange, handleMetadataFieldChange, handleBaseFieldChange, setEventData}=useEventForm(eventId);

    useEffect(()=>{
        const loadEvent = async()=>{
            const result = await getEvent(eventId as string);
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
        const result = await updateEvent(eventData as Event);
        if(result.status==="Success"){
            console.log("Event updated");
            nav('/eventsList');
        }
        else{
            console.log(`Error ${result.payload}`);
        }
    },[updateEvent, eventData,nav]);

    const handleDeleteEvent= useCallback(async()=>{
        const result = await deleteEvent(eventId as string);
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
            <div className={styles.board}>
                <TextBlock className={styles.editPageTextBlock}>Редактирование мероприятия</TextBlock>
                {
                    isLoading? <div>Загрузка...</div> :
                        <>
                            <EventForm
                                eventData={eventData}
                                handleMetadataFieldChange={handleMetadataFieldChange}
                                handleBaseFieldChange={handleBaseFieldChange}
                                TextAreaChange={handleTextAreaChange}
                            />
                            <div className={styles.buttonsBlock}>
                                <Button
                                    className={styles.cancelButton}
                                    onClick={handleCancel}>
                                    Отмена
                                </Button>
                                <Button
                                    className={styles.deleteButton}
                                    onClick={handleDeleteEvent}>
                                    Удалить
                                </Button>
                                <Button
                                    className={styles.saveButton}
                                    onClick={handleUpdateEvent}>
                                    Сохранить
                                </Button>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

