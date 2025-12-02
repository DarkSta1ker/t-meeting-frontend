import React, {type FC, useCallback} from "react";
import {TextBlock} from "../../shared/blocks/TextBlock/TextBlock";
import {Button} from "../../shared/ui/Button/Button";
import { useNavigate } from 'react-router-dom';
import styles from './CreateEventPage.module.css';
import {useEvent} from "../../hooks/useEvent";
import {EventForm} from "../../widgets/EventForm/EventForm";
import {useEventForm} from "../../hooks/useEventForm";
import {NewEvent} from "../../shared/types/event";
import {defaultNewEvent} from "../../shared/types/event";

export const CreateEventPage: FC = () => {

    const nav=useNavigate();
    const {addEvent, isLoading} = useEvent();
    const {eventData, handleTextAreaChange, handleMetadataFieldChange, handleBaseFieldChange}=useEventForm<NewEvent>(defaultNewEvent);

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
            <div className={styles.board}>
                <TextBlock className={styles.createPageTextBlock}>Создание мероприятия</TextBlock>
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
                                    className={styles.saveButton}
                                    disabled={isLoading}
                                    onClick={handleAddEvent}>
                                    Отправить
                                </Button>
                            </div>
                        </>
                }

            </div>
        </div>
    )
}

