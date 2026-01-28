import { Dayjs } from 'dayjs';
import { useCallback, useState, useMemo } from 'react';
import {getTimeAndDate} from '../shared/utils/formatTimeAndData';
interface UseEventFormValidationProps {
    initialName?: string;
    initialDate?: Dayjs | null;
}

interface ValidationErrors {
    name: string;
    date: string;
}

export const useEventFormValidation = ({ initialName = '', initialDate = null }: UseEventFormValidationProps) => {
    const [touched, setTouched] = useState({
        name: false,
        date: false,
    });

    const [errors, setErrors] = useState<ValidationErrors>({
        name: initialName ? '' : 'Поле названия не может быть пустым',
        date: initialDate ? '' : 'Поле даты должно быть заполнено',
    });

    const validateName = useCallback((name: string): string => {
        const trimmedValue = name.trim();
        if (!trimmedValue) {
            return 'Поле названия не может быть пустым';
        }
        if (trimmedValue.length > 100) {
            return 'Максимальная длина названия - 100 символов';
        }
        if (trimmedValue.length < 3) {
            return 'Минимальная длина названия - 3 символа';
        }
        return '';
    }, []);

    const validateDate = useCallback((date: Dayjs | null): string => {
        if (!date || !date.isValid()) {
            return 'Поле даты должно быть заполнено';
        }

        const errors: string[] = [];
        const now = getTimeAndDate();

        if (date.isBefore(now, 'day')) {
            errors.push('Дата не может быть в прошлом');
        }

        const maxFutureDate = now.add(2, 'year');
        if (date.isAfter(maxFutureDate)) {
            errors.push('Дата не может быть более чем на 2 года вперед');
        }

        return errors.join('. ');
    }, []);

    const validateForm = useCallback((name: string, date: Dayjs | null): boolean => {
        const nameError = validateName(name);
        const dateError = validateDate(date);

        setTouched({ name: true, date: true });
        setErrors({ name: nameError, date: dateError });

        return !nameError && !dateError;
    }, [validateName, validateDate]);

    const handleBlur = useCallback((field: 'name' | 'date') => {
        setTouched(prev => ({ ...prev, [field]: true }));
    }, []);

    const hasErrors = useMemo(() => {
        return !!(errors.name || errors.date);
    }, [errors]);

    return {
        errors,
        touched,
        hasErrors,
        validateName,
        validateDate,
        validateForm,
        handleBlur,
        setErrors,
        setTouched,
    };
};