import React, {FC, useState} from 'react';
import {MapBlock} from '../../shared/types/event';
import styles from './ReadOnlyMapBlock.module.css';

interface ReadOnlyMapBlockProps {
    payload: MapBlock['payload'];
}

export const ReadOnlyMapBlock: FC<ReadOnlyMapBlockProps> = ({payload}) => {
    const [activePointIndex, setActivePointIndex] = useState<number | null>(null);

    if (!payload.background) {
        return <div className={styles.emptyState}>Карта пока не добавлена</div>;
    }

    return (
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
                        key={`${point.x}-${point.y}-${index}`}
                        type="button"
                        className={styles.mapPoint}
                        style={{
                            left: `${point.x * 100}%`,
                            top: `${point.y * 100}%`,
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setActivePointIndex((prev) => (prev === index ? null : index));
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
    );
};
