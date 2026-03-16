import IconButton from '@mui/material/IconButton';
import {CirclePlus} from 'lucide-react';
import React, {type FC, useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useEvent} from '../../hooks/useEvent';
import {useEvents} from '../../hooks/useEvents';
import {buildEditEventRoute, buildEventRoute, ROUTES} from '../../shared/constants/constants';
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

    const handleUpdateEventList = useCallback(() => {
        getAllEvents()
            .then(() => {
                console.log('Events list updated');
            })
            .catch((err) => {
                console.log('Error while fetching getAllEvents: ', err);
            });
    }, [getAllEvents]);

    const handleDeleteEvent = useCallback((eventId: string) => {
        deleteEvent(eventId)
            .then(() => {
                console.log('Event deleted');
            })
            .catch((err) => {
                console.log('Error while fetching deleteEvent: ', err);
            });
        handleUpdateEventList();
    }, [deleteEvent, handleUpdateEventList]);

    const handleEditEvent = (eventId: string) => {
        nav(buildEditEventRoute(eventId));
    };

    const handleEventPage = (eventId: string) => {
        nav(buildEventRoute(eventId));
    };
    if (isLoading) {
        return (
            <div className={styles.eventsListPage}>
                <div className={styles.board}>
                    <PageTitle>Список мероприятий</PageTitle>
                    <div className={styles.eventsListBlock}>
                        <Loader/>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className={styles.eventsListPage}>
            <div className={styles.board}>
                <PageTitle>Список мероприятий</PageTitle>
                <div className={styles.eventsListBlock}>
                    {
                        events && events.length > 0 ?
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
                    <IconButton onClick={() => nav(ROUTES.CREATE_EVENT)}
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
