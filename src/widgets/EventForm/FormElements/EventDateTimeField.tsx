import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {ruRU} from '@mui/x-date-pickers/locales';
import {Dayjs} from 'dayjs';
import React, {FC, useState} from 'react';
import {getTZTimeAndDate} from '../../../shared/utils/formatTimeAndData';

interface EventDateTimeFieldProps {
    value: Dayjs | null;
    errorText: string;
    touched: boolean;
    onChange: (value: Dayjs | null) => void;
    onBlur: () => void;
}

export const EventDateTimeField: FC<EventDateTimeFieldProps> = (
    {value, errorText, touched, onChange, onBlur, ...props}) => {
    const [open, setOpen] = useState(false);

    const showError = !!errorText && touched;
    const formattedDate = value && !errorText
        ? value.format('dddd, D MMMM YYYY [в] HH:mm')
        : '';

    return (
        <DateTimePicker
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
            label="Дата и время проведения (НСК)"
            value={value}
            onChange={onChange}
            sx={{
                width: '100%',
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#000000',
                },
            }}
            ampm={false}
            format="DD.MM.YYYY HH:mm"
            timeSteps={{minutes: 5}}
            minDate={getTZTimeAndDate().startOf('day')}
            maxDate={getTZTimeAndDate().add(2, 'year')}
            slotProps={{
                textField: {
                    fullWidth: true,
                    error: showError,
                    helperText: showError ? errorText : formattedDate,
                    onBlur,
                    onClick: () => setOpen(true),
                    onKeyDown: () => setOpen(false),
                },
                actionBar: {
                    actions: ['accept', 'cancel', 'today', 'clear'],
                    sx: {
                        '& .MuiButton-root': {
                            color: '#000000',
                        }
                    }
                },
            }}
            {...props}
        />
    );
};
