import React, {FC} from 'react';
import styles from '../EventForm.module.css';

interface EventActionButtonsProps {
    eventId?: string;
    onCancel: () => void;
    onDelete?: () => void;
    onSubmit: () => void;
    disabled: boolean;
    isLoading: boolean;
}

export const EventActionButtons: FC<EventActionButtonsProps> = (
    {eventId, onCancel, onDelete, onSubmit, disabled, isLoading}) => (
    <div className={styles.actionButtonsWrapper}>
        <button
            type="button"
            onClick={onCancel}
            className={`${styles.actionButton} ${styles.secondaryButton}`}
        >
            Отмена
        </button>

        {eventId && onDelete && (
            <button
                type="button"
                onClick={onDelete}
                className={`${styles.actionButton} ${styles.dangerButton}`}
            >
                Удалить
            </button>
        )}

        <button
            type="submit"
            onClick={onSubmit}
            disabled={disabled || isLoading}
            className={`${styles.actionButton} ${styles.primaryButton}`}
        >
            {isLoading ? 'Сохраняем...' : 'Сохранить'}
        </button>
    </div>
);
