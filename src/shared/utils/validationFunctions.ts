import {Dayjs} from 'dayjs';
import {getTimeAndDate} from './formatTimeAndData';

export interface validationFunc {
    value: string;
    conditions?: any;
    message: string;
}

export const required = ({value, conditions, message}: validationFunc): string => {
    if (conditions !== false && !value.trim()) {
        return message;
    }
    return '';
};

export const min = ({value, conditions, message}: validationFunc): string => {
    if (value.length < conditions) {
        return message;
    }
    return '';
};

export const max = ({value, conditions, message}: validationFunc): string => {
    if (value.length > conditions) {
        return message;
    }
    return '';
};

export const regexp = ({value, conditions, message}: validationFunc): string => {
    if (!conditions.test(value)) {
        return message;
    }
    return '';
};

export const dateRange = (date: Dayjs | null): string => {
    const now = getTimeAndDate();
    const maxFutureDate = now.add(2, 'year');

    const error =
        (!date || !date.isValid() ? 'Поле даты должно быть заполнено' : '') ||
        (date && date.isBefore(now, 'day') ? 'Дата не может быть в прошлом' : '') ||
        (date && date.isAfter(maxFutureDate) ? 'Дата не может быть более чем на 2 года вперед' : '');

    return error;
};
