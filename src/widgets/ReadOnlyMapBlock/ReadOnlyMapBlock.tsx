import {Box} from '@mui/material';
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
                <button
                    type="button"
                    className={styles.overlayButton}
                    onClick={() => {
                        setActivePointIndex(null);
                        setTimePoints([]);
                    }}
                    aria-label="Скрыть описание точки"
                />
                {payload.points.map((point, index) => {
                    const isActive = activePointIndex === index;

                    return (
                        <Box
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePointClick(index);
                            }}
                            sx={{
                                position: 'absolute',
                                left: `${point.x * 100}%`,
                                top: `${point.y * 100}%`,
                                transform: 'translate(-50%, -50%)',
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                border: activePointIndex === index ? '3px solid black' : '2px solid black',
                                backgroundColor: activePointIndex === index ? 'lightgreen' : 'yellow',
                                opacity: activePointIndex === index ? 1 : 0.5,
                                cursor: 'pointer',
                                zIndex: activePointIndex === index ? 3 : 2,
                                boxShadow: 1,
                            }}
                        >
                            <div
                                className={`${styles.pointTooltip} ${
                                    isActive ? styles.pointTooltipOpen : styles.pointTooltipClosed
                                }`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {point.text || 'Без описания'}
                            </div>
                        </Box>

                    );
                })}


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
