import {CalendarDays} from 'lucide-react';
import React, {FC, useEffect} from 'react';
import {TimeLineBlock} from '../../shared/types/event';
import styles from './ReadOnlyTimeLine.module.css';

interface ReadOnlyTimelineProps {
    items: TimeLineBlock['payload'];
}

const formatTime = (time: string) => {
    if (!time) {
        return '—';
    }

    if (time.includes('T')) {
        const date = new Date(time);
        if (!Number.isNaN(date.getTime())) {
            return date.toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
            });
        }
    }

    if (time.includes(':')) {
        return time.slice(0, 5);
    }

    return time;
};

export const ReadOnlyTimeline: FC<ReadOnlyTimelineProps> = ({items}) => {

    useEffect(() => {
        console.log(items);
    }, []);

    if (!items.length) {
        return <div className={styles.emptyState}>Таймлайн пока не заполнен</div>;
    }

    return (
        <div className={styles.timelineWrapper}>
            <div className={styles.timelineLine}>
                {items.map((item, index) => (
                    <div
                        key={`${item.name}-${item.time}-${index}`}
                        className={styles.segment}
                    />
                ))}
            </div>

            <div className={styles.timelineGrid}>
                {items.map((item, index) => {
                    const isTop = index % 2 === 0;

                    return (
                        <div
                            key={`${item.name}-${item.time}-${index}-content`}
                            className={`${styles.timelineItem} ${
                                isTop ? styles.topItem : styles.bottomItem
                            }`}
                        >
                            <div className={styles.connector}/>

                            <div className={styles.iconCircle}>
                                <CalendarDays size={18}/>
                            </div>

                            <div className={styles.itemTitle}>{item.name || 'Без названия'}</div>
                            <div className={styles.itemTime}>{formatTime(item.time)}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
