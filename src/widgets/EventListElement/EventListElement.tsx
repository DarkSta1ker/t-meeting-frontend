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
    onCopyLink?: (link: string) => void;
}

export const EventListElement: FC<EventListElementProps> = ({
                                                                event,
                                                                handleEditEvent,
                                                                handleEventPage,
                                                                handleDeleteEvent,
                                                                onCopyLink,
                                                            }) => {
    return (
        <div className={styles.card}
             onClick={() => handleEventPage(event.id)}
        >
            <div className={styles.topRow}>
                <div
                    className={styles.mainInfo}
                >
                    <Typography className={styles.title}
                                sx={{
                                    fontSize: '24px',
                                    fontWeight: '600',
                                    marginBottom: '6px'
                                }}
                    >
                        {event.name}
                    </Typography>

                    <Typography className={styles.description}>
                        {getDescription(event)}
                    </Typography>
                </div>

                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button
                            className={styles.menuButton}
                            onClick={(e) => e.stopPropagation()}
                        >

                            <EllipsisVertical size={20}/>
                        </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            className={styles.dropdownMenuContent}
                            side="left"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <DropdownMenu.Item
                                className={styles.dropdownMenuItem}
                                onSelect={(e) => {
                                    e.stopPropagation();
                                    const link = `${window.location.origin}/published-event/${event.id}`;
                                    navigator.clipboard.writeText(link)
                                        .then(() => onCopyLink?.(link))
                                        .catch((err) => console.log('Не удалось скопировать:', err));
                                }}
                            >
                                Скопировать ссылку
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                                className={styles.dropdownMenuItem}
                                onSelect={(e) => {
                                    e.stopPropagation();
                                    handleEventPage(event.id);
                                }}
                            >
                                Открыть
                            </DropdownMenu.Item>

                            <DropdownMenu.Item
                                className={styles.dropdownMenuItem}
                                onSelect={(e) => {
                                    e.stopPropagation();
                                    handleEditEvent(event.id);
                                }}
                            >
                                Редактировать
                            </DropdownMenu.Item>

                            <DropdownMenu.Item
                                className={styles.dropdownMenuItem}
                                onSelect={(e) => {
                                    e.stopPropagation();
                                    handleDeleteEvent(event.id);
                                }}
                            >
                                Удалить
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>

            <div
                className={styles.metaRow}
            >
                <div className={styles.metaItem}>
                    <Calendar size={16}/>
                    {getTimeAndDateString(event.metadata.datetime)}
                </div>

                <div className={styles.metaItem}>
                    <MapPinIcon size={16}/>
                    {event.metadata.location}
                </div>
            </div>

            <div className={styles.bottomRow}>
                <Typography
                    className={styles.secondary}
                    sx={{
                        fontSize: 12,
                    }}
                >
                    Обновлено: {getTimeAndDateString(event.updatedAt)}
                </Typography>

                <div className={styles.status}>
                    <EventStatusCircle status={event.status}/>
                    <Typography
                        className={styles.secondary}
                        sx={{
                            fontSize: 12,
                        }}
                    >
                        {getRuStatus(event.status)}
                    </Typography>
                </div>
            </div>
        </div>
    );
};
