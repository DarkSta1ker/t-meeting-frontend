import React, {type FC, useCallback} from "react";
import {TextBlock} from "../../shared/blocks/TextBlock/TextBlock";
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditEventPage.module.css';
import {useEvent} from "../../hooks/useEvent";
import {EventForm} from "../../widgets/EventForm/EventForm";
import {useEventForm} from "../../hooks/useEventForm";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
export const EditEventPage: FC = () => {
    const nav=useNavigate();
    const { eventId } = useParams<{ eventId: string }>();
    const {updateEvent, deleteEvent, isLoading} = useEvent();
    const {eventData, handleTextAreaChange, handleMetadataFieldChange, handleBaseFieldChange, handleChangeStatus}=useEventForm(eventId);
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
                <Typography
                    variant="h6"
                    sx={{
                        height:'64px',
                        display:'flex',
                        alignItems: 'center',
                    }}
                >
                    Редактирование мероприятия
                </Typography>
                {
                    isLoading? <div>Загрузка...</div> :
                        <>
                            <EventForm
                                eventData={eventData}
                                handleMetadataFieldChange={handleMetadataFieldChange}
                                handleBaseFieldChange={handleBaseFieldChange}
                                TextAreaChange={handleTextAreaChange}
                                handleChangeStatus={handleChangeStatus}
                            />
                            <div className={styles.buttonsBlock}>
                                <Button
                                    variant="outlined"
                                    disabled={isLoading}
                                    onClick={handleCancel}
                                    size="large"
                                    sx={{
                                        color: "#fecd00",
                                        borderColor: "#fecd00",
                                        fontWeight: 'bold',
                                        border: "2px solid #fecd00",
                                        '&:hover': {
                                            backgroundColor: "rgba(255,249,0,0.26)",
                                        }
                                    }}
                                >
                                    Отмена
                                </Button>
                                <Button
                                    variant="outlined"
                                    disabled={isLoading}
                                    onClick={handleDeleteEvent}
                                    size="large"
                                    sx={{
                                        color: "#ec231e",
                                        borderColor: "#ec231e",
                                        fontWeight: 'bold',
                                        border: "2px solid #ec231e",
                                        '&:hover': {
                                            backgroundColor: "rgba(255,0,13,0.26)",
                                        }
                                    }}
                                >
                                    Удалить
                                </Button>
                                <Button
                                    variant="outlined"
                                    disabled={isLoading}
                                    onClick={handleUpdateEvent}
                                    size="large"
                                    sx={{
                                        color: "#34c658",
                                        borderColor: "#34c658",
                                        fontWeight: 'bold',
                                        border: "2px solid #34c658",
                                        '&:hover': {
                                            backgroundColor: "rgba(28,255,0,0.26)",
                                        }
                                    }}
                                >

                                    Сохранить
                                </Button>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

