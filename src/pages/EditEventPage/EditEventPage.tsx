import React, {type FC, useCallback} from "react";
import {TextBlock} from "../../shared/blocks/TextBlock/TextBlock";
import {Button} from "../../shared/ui/Button/Button";
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditEventPage.module.css';
import {useEvent} from "../../hooks/useEvent";
import {EventForm} from "../../widgets/EventForm/EventForm";
import {useEventForm} from "../../hooks/useEventForm";

export const EditEventPage: FC = () => {
    const nav=useNavigate();
    const { eventId } = useParams<{ eventId: string }>();
    const {updateEvent, deleteEvent, isLoading} = useEvent();
    const {eventData, handleTextAreaChange, handleMetadataFieldChange, handleBaseFieldChange}=useEventForm(eventId);
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
        if(eventId) {
            const result = await deleteEvent(eventId);
            if (result.status === "Success") {
                console.log("Event deleted");
                nav('/eventsList');
            } else {
                console.log(`Error ${result.payload}`);
            }
        }
        else{
            console.log('Ошибка! Нет id')
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

