import Typography from '@mui/material/Typography';
import {Calendar, EllipsisVertical, MapPinIcon} from 'lucide-react';
import {DropdownMenu} from 'radix-ui';
import React, {FC} from 'react';
import {getRuStatus} from '../../shared/constants/constants';
import {EventListItem} from '../../shared/types/event';
import {EventStatusCircle} from '../../shared/ui/EventStatus/EventStatusCircle';
import {getTimeAndDateString} from '../../shared/utils/formatTimeAndData';
import {getDescription} from '../../shared/utils/helpFunctions';
import styles from './EventListElement.module.css';

interface EventListElementProps {
    event: EventListItem;
    handleEventPage: (eventId: string) => void;
    handleEditEvent: (eventId: string) => void;
    handleDeleteEvent: (eventId: string) => void;
}

export const EventListElement: FC<EventListElementProps> = ({
                                                                event,
                                                                handleEditEvent,
                                                                handleEventPage,
                                                                handleDeleteEvent
                                                            }) => {
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
                            variant="h6"
                            className={`${styles.textEllipsis} ${styles.flexCenter}`}
                        >{event.name}</Typography>
                        <Typography
                            variant="body1"
                            className={styles.textEllipsisMultiline}
                        >
                            {getDescription(event)}
                        </Typography>
                    </div>
                    <div
                        className={styles.dataAndPlace}
                        onClick={() => handleEventPage(event.id)}
                    >
                        <div className={styles.dataBlock}>
                            <Typography
                                variant="body1"
                                className={`${styles.textOverflow} ${styles.flexCenter}`}
                            >
                                {getTimeAndDateString(event.metadata.datetime)}
                            </Typography>
                            <Calendar/>
                        </div>
                        <div className={styles.placeBlock}>
                            <Typography
                                variant="body1"
                                className={`${styles.textOverflow} ${styles.flexCenter}`}
                            >{event.metadata.location}</Typography>

                            <MapPinIcon/>
                        </div>
                    </div>
                </div>
                <div className={styles.dropDownMenu}>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <button className={styles.dropDownMenuButton}
                                    aria-label="Actions">
                                <EllipsisVertical/>
                            </button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Portal>
                            <DropdownMenu.Content
                                className={styles.dropdownMenuContent} side="left"
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
                    variant="body2"
                >Создано: {getTimeAndDateString(event.createdAt)} |
                    Обновлено: {getTimeAndDateString(event.updatedAt)}</Typography>
                <div className={styles.status}>
                    <Typography
                        variant="body2"
                    >Cтатус: {getRuStatus(event.status)}</Typography>
                    <EventStatusCircle status={event.status}/>
                </div>
            </div>
        </div>
    );
};
