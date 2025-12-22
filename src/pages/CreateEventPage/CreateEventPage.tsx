import Typography from '@mui/material/Typography';
import React, {type FC, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import {useEvent} from '../../hooks/useEvent';
import {useEventForm} from '../../hooks/useEventForm';
import {EventForm} from '../../widgets/EventForm/EventForm';
import styles from './CreateEventPage.module.css';
export const CreateEventPage: FC = () => {

    const nav = useNavigate();
    const {addEvent, isLoading} = useEvent();
    const {
        eventData,
        handleTextAreaChange,
        handleMetadataFieldChange,
        handleBaseFieldChange,
        handleChangeStatus
    } = useEventForm();
    const handleAddEvent = useCallback(async () => {
        const resp = await addEvent(eventData);
        if (resp.status === 'Success') {
            nav('/eventsList');
        } else {
            console.log(`${resp.status} | ${resp.payload}`);
        }
    }, [addEvent, eventData, nav]);

    return (
        <div className={styles.createEventPage}>
            <div className={styles.board}>
                <Typography
                    variant='h5'
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        height: '64px',
                    }}
                >Создание мероприятия</Typography>
                {
                    isLoading ? <div>Загрузка...</div>
                        :
                        <>
                            <EventForm
                                eventData={eventData}
                                handleMetadataFieldChange={handleMetadataFieldChange}
                                handleBaseFieldChange={handleBaseFieldChange}
                                TextAreaChange={handleTextAreaChange}
                                handleChangeStatus={handleChangeStatus}
                                handlePostOrUpdate={handleAddEvent}
                            />
                        </>
                }
            </div>
        </div>
    );
};
