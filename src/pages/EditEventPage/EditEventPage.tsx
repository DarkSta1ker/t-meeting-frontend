import Typography from '@mui/material/Typography';
import React, {type FC, useCallback} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useEvent} from '../../hooks/useEvent';
import {useEventForm} from '../../hooks/useEventForm';
import {EventForm} from '../../widgets/EventForm/EventForm';
import {Loader} from '../../shared/loader/Loader'
import styles from './EditEventPage.module.css';

export const EditEventPage: FC = () => {
    const nav = useNavigate();
    const {eventId} = useParams<{ eventId: string }>();
    const {updateEvent, isLoading} = useEvent();
    const {
        eventData,
        handleTextAreaChange,
        handleMetadataFieldChange,
        handleBaseFieldChange,
        handleChangeStatus
    } = useEventForm(eventId);
    const handleUpdateEvent = useCallback(async () => {
        const result = await updateEvent(eventData);
        if (result.status === 'Success') {
            console.log('Event updated');
            nav('/eventsList');
        } else {
            console.log(`Error ${result.payload}`);
        }
    }, [updateEvent, eventData, nav]);

    return (
        <div className={styles.editEventPage}>
            <div className={styles.board}>
                <Typography
                    variant='h5'
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        height: '64px',
                    }}
                >
                    Редактирование мероприятия
                </Typography>
                {
                    isLoading ? <Loader/> :
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
    );
};
