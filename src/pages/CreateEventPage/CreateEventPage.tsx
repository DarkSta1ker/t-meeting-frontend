import React, {type FC, useCallback} from "react";
import {TextBlock} from "../../shared/blocks/TextBlock/TextBlock";
import { useNavigate } from 'react-router-dom';
import styles from './CreateEventPage.module.css';
import {useEvent} from "../../hooks/useEvent";
import {EventForm} from "../../widgets/EventForm/EventForm";
import {useEventForm} from "../../hooks/useEventForm";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
export const CreateEventPage: FC = () => {

    const nav=useNavigate();
    const {addEvent, isLoading} = useEvent();
    const {eventData, handleTextAreaChange, handleMetadataFieldChange, handleBaseFieldChange}=useEventForm();

    const handleAddEvent = useCallback(async ()=>{
        const resp = await addEvent(eventData);
        if (resp.status=== "Success") {
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
                <Typography
                    variant="h6"
                    sx={{
                        height:'64px',
                        display:'flex',
                        alignItems: 'center',
                    }}
                >Создание мероприятия</Typography>
                {
                    isLoading? <div>Загрузка...</div>
                        :
                        <>
                            <EventForm
                                eventData={eventData}
                                handleMetadataFieldChange={handleMetadataFieldChange}
                                handleBaseFieldChange={handleBaseFieldChange}
                                TextAreaChange={handleTextAreaChange}
                            />
                            <div className={styles.buttonsBlock}>
                                <Button
                                    variant="outlined"
                                    onClick={handleCancel}
                                    size="large"
                                    disabled={isLoading}
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
                                    onClick={handleAddEvent}
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

                                    Отправить
                                </Button>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

