import {Chip, Typography} from '@mui/material';
import {Calendar, MapPinIcon} from 'lucide-react';
import React, {type FC, useEffect, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {useEvent} from '../../hooks/useEvent';
import {useEventForm} from '../../hooks/useEventForm';
import {getRuStatus} from '../../shared/constants/constants';
import {Loader} from '../../shared/loader/Loader';
import {MapBlock, TimeLineBlock,} from '../../shared/types/event';
import {getTimeAndDateString} from '../../shared/utils/formatTimeAndData';
import {getDescription} from '../../shared/utils/helpFunctions';
import {ReadOnlyMapBlock} from '../../widgets/ReadOnlyMapBlock/ReadOnlyMapBlock';
import {ReadOnlyTimeline} from '../../widgets/ReadOnlyTimeLine/ReadOnlyTimeLine';
import styles from './EventPage.module.css';

export const EventPage: FC = () => {
    const {eventId} = useParams<{ eventId: string }>();
    const {getEvent, isLoading} = useEvent();
    const {eventData, setEventData} = useEventForm();

    useEffect(() => {
        const loadEvent = async () => {
            if (!eventId) {
                console.log('No eventId found');
                return;
            }

            getEvent(eventId)
                .then((res) => {
                    setEventData(res);
                    console.log('Event loaded');
                })
                .catch((err) => {
                    console.log('Error while fetching getEvent: ', err);
                });
        };

        loadEvent();
    }, [getEvent, eventId, setEventData]);

    const timeline = useMemo(() => {
        const block = eventData.content.find(
            (item): item is TimeLineBlock => item.block === 'timeline'
        );
        return block?.payload ?? [];
    }, [eventData.content]);

    const mapBlock = useMemo(() => {
        const block = eventData.content.find(
            (item): item is MapBlock => item.block === 'map'
        );
        return block?.payload ?? {background: '', points: []};
    }, [eventData.content]);

    if (isLoading) {
        return (
            <div className={styles.eventPage}>
                <div className={styles.board}>
                    <div className={styles.loading}>
                        <Loader/>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.eventPage}>
            <div className={styles.board}>
                <section className={styles.heroCard}>
                    <div className={styles.heroTop}>
                        <div className={styles.heroTitleBlock}>
                            <Typography className={styles.pageTitle}>
                                {eventData.name}
                            </Typography>

                            <Typography className={styles.pageDescription}>
                                {getDescription(eventData)}
                            </Typography>
                        </div>

                        <Chip
                            label={getRuStatus(eventData.status)}
                            className={styles.statusChip}
                        />
                    </div>

                    <div className={styles.heroMeta}>
                        <div className={styles.metaItem}>
                            <Calendar size={18}/>
                            <span>{getTimeAndDateString(eventData.metadata.datetime)}</span>
                        </div>

                        <div className={styles.metaItem}>
                            <MapPinIcon size={18}/>
                            <span>{eventData.metadata.location || 'Место не указано'}</span>
                        </div>
                    </div>

                    <div className={styles.timestamps}>
                        <span>Создано: {getTimeAndDateString(eventData.createdAt)}</span>
                        <span>Обновлено: {getTimeAndDateString(eventData.updatedAt)}</span>
                    </div>
                </section>

                <section className={styles.sectionCard}>
                    <Typography className={styles.sectionTitle}>
                        Описание мероприятия
                    </Typography>

                    <div className={styles.descriptionBox}>
                        <Typography className={styles.descriptionText}>
                            {getDescription(eventData)}
                        </Typography>
                    </div>
                </section>

                <section className={styles.sectionCard}>
                    <Typography className={styles.sectionTitle}>
                        Таймлайн
                    </Typography>

                    <ReadOnlyTimeline items={timeline}/>
                </section>

                <section className={styles.sectionCard}>
                    <Typography className={styles.sectionTitle}>
                        Карта
                    </Typography>

                    <ReadOnlyMapBlock payload={mapBlock}/>
                </section>
            </div>
        </div>
    );
};
