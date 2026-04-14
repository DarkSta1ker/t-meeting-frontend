import React, {FC, useState} from 'react';
import {InteractivePoints} from '../../shared/types/event';
import {ReadOnlyTimeline} from '../ReadOnlyTimeLine/ReadOnlyTimeLine';
import styles from './ReadOnlyMapBlock.module.css';

interface ReadOnlyMapBlockProps {
    payload: InteractivePoints['payload'];
}

export interface TimePoint {
    name: string;
    time: string;
}

export const ReadOnlyMapBlock: FC<ReadOnlyMapBlockProps> = ({payload}) => {
    const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
    const [timePoints, setTimePoints] = useState<TimePoint[]>([]);
    if (!payload.background) {
        return <div className={styles.emptyState}>Карта пока не добавлена</div>;
    }
    const handlePointClick = (index: number) => {
        const newActiveIndex = activePointIndex === index ? null : index;
        setActivePointIndex(newActiveIndex);
        if (newActiveIndex !== null) {
            const newTimePoints = payload.points[newActiveIndex].timeline;
            if (newTimePoints && newTimePoints.length > 0) {
                setTimePoints(newTimePoints);
            } else {
                setTimePoints([]);
            }
        } else {
            setTimePoints([]);
        }

    };
    return (
        <div>
            <div className={styles.mapWrapper}>
                <img
                    src={payload.background}
                    alt="Карта мероприятия"
                    className={styles.mapImage}
                />

                {payload.points.map((point, index) => {
                    const isActive = activePointIndex === index;

                    return (
                        <button
                            key={index}
                            type="button"
                            className={styles.mapPoint}
                            style={{
                                left: `${point.x * 100}%`,
                                top: `${point.y * 100}%`,
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePointClick(index);
                            }}
                        >
                            <span className={styles.pointInner}/>

                            {isActive && (
                                <div
                                    className={styles.pointTooltip}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {point.text || 'Без описания'}
                                </div>
                            )}
                        </button>
                    );
                })}

                <button
                    type="button"
                    className={styles.overlayButton}
                    onClick={() => setActivePointIndex(null)}
                    aria-label="Скрыть описание точки"
                />
            </div>
            {
                timePoints.length > 0 &&
                <div className={styles.timeline}>
                    <ReadOnlyTimeline items={timePoints}/>
                </div>
            }


        </div>
    );
};
