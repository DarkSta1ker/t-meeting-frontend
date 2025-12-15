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
                        <EventForm
                            eventData={eventData}
                            handleMetadataFieldChange={handleMetadataFieldChange}
                            handleBaseFieldChange={handleBaseFieldChange}
                            TextAreaChange={handleTextAreaChange}
                            handleChangeStatus={handleChangeStatus}
                            handlePostOrUpdate={handleUpdateEvent}
                        />
                }
            </div>
        </div>
    )
}

