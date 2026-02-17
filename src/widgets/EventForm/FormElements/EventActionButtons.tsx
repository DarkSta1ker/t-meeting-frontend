import Button from '@mui/material/Button';
import React, { FC } from 'react';
import {buttonStyles} from '../../../shared/constants/constants';
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
    {eventId, onCancel, onDelete, onSubmit, disabled, isLoading})=> (
    <div className={styles.buttonsBlock}>
        <Button
            variant='outlined'
            onClick={onCancel}
            size='large'
            disabled={isLoading}
            sx={buttonStyles.cancel}
        >
            Отмена
        </Button>

        {eventId && onDelete && (
            <Button
                variant='outlined'
                disabled={isLoading}
                onClick={onDelete}
                size='large'
                sx={buttonStyles.delete}
            >
                Удалить
            </Button>
        )}

        <Button
            variant='outlined'
            disabled={disabled || isLoading}
            onClick={onSubmit}
            size='large'
            sx={buttonStyles.submit}
        >
            {eventId ? 'Сохранить' : 'Отправить'}
        </Button>
    </div>
);
