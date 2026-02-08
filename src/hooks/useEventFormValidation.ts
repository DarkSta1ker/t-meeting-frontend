import {Dayjs} from 'dayjs';
import {useCallback, useMemo, useState} from 'react';
import {dateRange, max, min, required} from '../shared/utils/validationFunctions';

interface UseEventFormValidationProps {
    initialName?: string;
    initialDate?: Dayjs | null;
}

interface ValidationErrors {
    name: string;
    date: string;
}

export const useEventFormValidation = ({initialName = '', initialDate = null}: UseEventFormValidationProps) => {
    const [touched, setTouched] = useState({
        name: false,
        date: false,
    });

    const [errors, setErrors] = useState<ValidationErrors>({
        name: initialName ? '' : 'Поле названия не может быть пустым',
        date: initialDate ? '' : 'Поле даты должно быть заполнено',
    });

    const validateName = useCallback((login: string): string => {
        return required({value: login, message: 'Поле названия не может быть пустым'})
            || min({value: login, conditions: 3, message: 'Минимальная длина названия - 3 символа'})
            || max({value: login, conditions: 100, message: 'Максимальная длина названия - 100 символов'});
    }, []);

    const validateDate = useCallback((date: Dayjs | null): string => {
        return dateRange(date);
    }, []);

    const validateForm = useCallback((name: string, date: Dayjs | null): boolean => {
        const nameError = validateName(name);
        const dateError = validateDate(date);

        setTouched({name: true, date: true});
        setErrors({name: nameError, date: dateError});

        return !nameError && !dateError;
    }, [validateName, validateDate]);

    const handleBlur = useCallback((field: 'name' | 'date') => {
        setTouched(prev => ({...prev, [field]: true}));
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
