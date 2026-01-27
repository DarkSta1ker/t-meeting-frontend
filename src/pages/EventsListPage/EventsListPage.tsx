import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {CirclePlus} from 'lucide-react';
import React, {type FC, useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useEvent} from '../../hooks/useEvent';
import {useEvents} from '../../hooks/useEvents';
import {Loader} from '../../shared/loader/Loader';
import {PageTitle} from '../../shared/ui/PageTitle/PageTitle';
import {EventListElement} from '../../widgets/EventListElement/EventListElement';
import styles from './EventsListPage.module.css';

export const EventsListPage: FC = () => {

    const nav = useNavigate();
    const {deleteEvent} = useEvent();
    const {events, getAllEvents, isLoading} = useEvents();

    useEffect(() => {
        getAllEvents();
    }, []);

    const handleUpdateEventList = useCallback(async () => {
        const result = await getAllEvents();
        if (result.status === 'Success') {
            console.log('Events list updated');
        } else {
            console.log(`Error ${result.payload}`);
        }
    }, [getAllEvents]);

    const handleDeleteEvent = useCallback(async (eventId: string) => {
        const result = await deleteEvent(eventId);
        if (result.status === 'Success') {
            console.log('Event deleted');
        } else {
            console.log(`Error ${result.payload}`);
        }
        await handleUpdateEventList();
    }, [deleteEvent, handleUpdateEventList]);

    const handleEditEvent = (eventId: string) => {
        nav(`/editEvent/${eventId}`);
    };

    const handleEventPage = (eventId: string) => {
        nav(`/event/${eventId}`);
    };

    return (
        <div className={styles.eventsListPage}>
            <div className={styles.board}>
                <PageTitle>Список мероприятий</PageTitle>
                <div className={styles.eventsListBlock}>
                    {
                        isLoading ?
                            <Loader/>
                            :
                            <>
                                {
                                    events ?
                                        events.map((event) => (
                                            <EventListElement
                                                key={event.id}
                                                event={event}
                                                handleEditEvent={handleEditEvent}
                                                handleEventPage={handleEventPage}
                                                handleDeleteEvent={handleDeleteEvent}
                                            />
                                        ))
                                        :
                                        <div className={styles.noEventsBlock}>
                                            Пока что тут нет мероприятий, вы можете добавить их с помощью кнопки ниже.
                                        </div>
                                }
                            </>
                    }
                    <IconButton onClick={() => nav('/createEvent')}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#cfd0d5',
                                        borderRadius: '25px',
                                    },
                                    'backgroundColor': 'transparent',
                                    'bottom': '15px',
                                    'color': '#757575',
                                    'position': 'absolute',
                                    'right': '56px',
                                }}
                    >
                        <CirclePlus size={30}/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
};
