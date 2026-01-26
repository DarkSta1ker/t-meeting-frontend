import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {Calendar, CirclePlus, EllipsisVertical, MapPinIcon} from 'lucide-react';
import {DropdownMenu} from 'radix-ui';
import React, {type FC, useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useEvent} from '../../hooks/useEvent';
import {useEvents} from '../../hooks/useEvents';
import {Loader} from '../../shared/loader/Loader';
import {EventStatusCircle} from '../../shared/ui/EventStatus/EventStatusCircle';
import {getTimeAndDateString} from '../../shared/utils/formatTimeAndData';
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

    const handleGetRuStatus = (status: string) => {
        switch (status) {
            case 'draft':
                return 'Редактирование';
            case 'cancelled':
                return 'Отменено';
            case 'archived':
                return 'Архивировано';
            default:
                return 'Опубликовано';
        }
    };
    return (
        <div className={styles.eventsListPage}>
            <div className={styles.board}>
                <Typography
                    variant='h5'
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        height: '64px',
                    }}
                >Список мероприятий</Typography>
                <div className={styles.eventsListBlock}>
                    {
                        isLoading ?
                            <Loader/>
                            :
                            <>
                                {
                                    events ?
                                        events.map((event) => (
                                            <div key={event.id} className={styles.eventBlock}>
                                                <div className={styles.eventBlockCardBox}>
                                                    <div
                                                        className={styles.eventBlockCard}
                                                    >
                                                        <div
                                                            className={styles.nameAndDescriptionListPage}
                                                            onClick={() => handleEventPage(event.id)}
                                                        >
                                                            <Typography
                                                                variant='h6'
                                                                sx={{
                                                                    alignItems: 'center',
                                                                    display: 'flex',
                                                                    maxWidth: '90%',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    whiteSpace: 'nowrap',
                                                                }}
                                                            >{event.name}</Typography>
                                                            <Typography
                                                                variant='body1'
                                                                sx={{
                                                                    WebkitBoxOrient: 'vertical',
                                                                    WebkitLineClamp: 3,
                                                                    display: '-webkit-box',
                                                                    lineHeight: 1.5,
                                                                    margin: 0,
                                                                    maxHeight: '4.5em',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    width: '95%',
                                                                }}
                                                            >
                                                                {event.content[0].payload.join(' ')}
                                                            </Typography>
                                                        </div>
                                                        <div
                                                            className={styles.dataAndPlace}
                                                            onClick={() => handleEventPage(event.id)}
                                                        >
                                                            <div className={styles.dataBlock}>
                                                                <Typography
                                                                    variant='body1'
                                                                    sx={{
                                                                        alignItems: 'center',
                                                                        display: 'flex',
                                                                    }}
                                                                >
                                                                    {getTimeAndDateString(event.metadata.datetime)}
                                                                </Typography>
                                                                <Calendar/>
                                                            </div>
                                                            <div className={styles.placeBlock}>
                                                                <Typography
                                                                    variant='body1'
                                                                    sx={{
                                                                        alignItems: 'center',
                                                                        display: 'flex',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        whiteSpace: 'nowrap',
                                                                    }}
                                                                >{event.metadata.location}</Typography>

                                                                <MapPinIcon/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.dropDownMenu}>
                                                        <DropdownMenu.Root>
                                                            <DropdownMenu.Trigger asChild>
                                                                <button className={styles.dropDownMenuButton}
                                                                        aria-label='Actions'>
                                                                    <EllipsisVertical/>
                                                                </button>
                                                            </DropdownMenu.Trigger>

                                                            <DropdownMenu.Portal>
                                                                <DropdownMenu.Content
                                                                    className={styles.dropdownMenuContent} side='left'
                                                                    sideOffset={5}>
                                                                    <DropdownMenu.Item
                                                                        className={styles.dropdownMenuItem}
                                                                        onSelect={() => handleEventPage(event.id)}>
                                                                        Страница мероприятия
                                                                    </DropdownMenu.Item>
                                                                    <DropdownMenu.Item
                                                                        className={styles.dropdownMenuItem}
                                                                        onSelect={() => handleEditEvent(event.id)}>
                                                                        Редактировать
                                                                    </DropdownMenu.Item>
                                                                    <DropdownMenu.Item
                                                                        className={styles.dropdownMenuItem}
                                                                        onSelect={() => handleDeleteEvent(event.id)}>
                                                                        Удалить
                                                                    </DropdownMenu.Item>
                                                                    <DropdownMenu.Arrow
                                                                        className={styles.dropdownMenuArrow}/>

                                                                </DropdownMenu.Content>
                                                            </DropdownMenu.Portal>
                                                        </DropdownMenu.Root>

                                                    </div>
                                                </div>
                                                <div className={styles.infoBlock}>
                                                    <Typography
                                                        variant='body2'
                                                    >Создано: {getTimeAndDateString(event.createdAt)} |
                                                        Обновлено: {getTimeAndDateString(event.updatedAt)}</Typography>
                                                    <div className={styles.status}>
                                                        <Typography
                                                            variant='body2'
                                                        >Cтатус: {handleGetRuStatus(event.status)}</Typography>
                                                        <EventStatusCircle status={event.status}/>
                                                    </div>
                                                </div>
                                            </div>

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
