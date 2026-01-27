import Typography from '@mui/material/Typography';
import {Calendar, EllipsisVertical, MapPinIcon} from 'lucide-react';
import {DropdownMenu} from 'radix-ui';
import React, {FC} from 'react';
import styles from '../../pages/EventsListPage/EventsListPage.module.css';
import {getRuStatus} from '../../shared/constants/constants';
import {EventListItem} from '../../shared/types/event';
import {EventStatusCircle} from '../../shared/ui/EventStatus/EventStatusCircle';
import {getTimeAndDateString} from '../../shared/utils/formatTimeAndData';

interface EventListElementProps {
    event: EventListItem;
    handleEventPage: (eventId: string) => void;
    handleEditEvent: (eventId: string) => void;
    handleDeleteEvent: (eventId: string) => void;
}

export const EventListElement: FC<EventListElementProps> = ({event, handleEditEvent, handleEventPage, handleDeleteEvent}) => {
    return (
        <div className={styles.eventBlock}>
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
                    >Cтатус: {getRuStatus(event.status)}</Typography>
                    <EventStatusCircle status={event.status}/>
                </div>
            </div>
        </div>
    );
};
