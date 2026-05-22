import IconButton from '@mui/material/IconButton';
import {CirclePlus} from 'lucide-react';
import React, {type FC, useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useEvent} from '../../hooks/useEvent';
import {useEvents} from '../../hooks/useEvents';
import {buildEditEventRoute, buildEventRoute, ROUTES} from '../../shared/constants/constants';
import {Loader} from '../../shared/loader/Loader';
import {CopyLinkDialog} from '../../shared/ui/CopyLinkDialog/CopyLinkDialog';
import {PageTitle} from '../../shared/ui/PageTitle/PageTitle';
import {EventListElement} from '../../widgets/EventListElement/EventListElement';
import styles from './EventsListPage.module.css';

export const EventsListPage: FC = () => {

    const nav = useNavigate();
    const {deleteEvent} = useEvent();
    const {events, getAllEvents, isLoading} = useEvents();
    const [copiedLink, setCopiedLink] = useState<string | null>(null);

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
                                    onCopyLink={(link) => setCopiedLink(link)}
                                />
                            ))
                            :
                            <div className={styles.noEventsBlock}>
                                Пока что тут нет мероприятий, вы можете добавить их с помощью кнопки ниже.
                            </div>
                    }
                    <CopyLinkDialog
                        open={!!copiedLink}
                        link={copiedLink || ''}
                        onClose={() => setCopiedLink(null)}
                    />
                    <IconButton
                        onClick={() => nav(ROUTES.CREATE_EVENT)}
                        sx={{
                            position: 'fixed',
                            bottom: '32px',
                            right: '32px',

                            width: '56px',
                            height: '56px',

                            backgroundColor: '#FFDD2D',
                            color: '#000',

                            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',

                            '&:hover': {
                                backgroundColor: '#ffd500',
                            },
                        }}
                    >
                        <CirclePlus size={28}/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
};
