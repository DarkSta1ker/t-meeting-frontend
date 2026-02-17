import { FormHelperText } from '@mui/material';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { ruRU } from '@mui/x-date-pickers/locales';
import { Dayjs } from 'dayjs';
import React, { FC } from 'react';
import {getTZTimeAndDate} from '../../../shared/utils/formatTimeAndData';

interface EventDateTimeFieldProps {
    value: Dayjs | null;
    errorText: string;
    touched: boolean;
    onChange: (value: Dayjs | null) => void;
    onBlur: () => void;
}

export const EventDateTimeField: FC<EventDateTimeFieldProps> = (
    {value, errorText, touched, onChange, onBlur, ...props}) => (
    <div style={{ width: '100%' }}>
        <DateTimePicker
            localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
            label='Дата и время проведения (НСК)'
            value={value}
            onChange={onChange}
            sx={{ width: '100%' }}
            ampm={false}
            format='DD.MM.YYYY HH:mm'
            timeSteps={{ minutes: 5 }}
            minDate={getTZTimeAndDate().startOf('day')}
            maxDate={getTZTimeAndDate().add(2, 'year')}
            slotProps={{
                textField: {
                    error: !!errorText && touched,
                    onBlur,
                },
                actionBar: {
                    actions: ['accept', 'cancel', 'today', 'clear']
                }
            }}
            {...props}
        />

        {errorText && touched && (
            <FormHelperText error sx={{ mt: 0.5 }}>
                {errorText}
            </FormHelperText>
        )}

        {value && !errorText && (
            <FormHelperText sx={{ mt: 0.5, color: 'green' }}>
                {value.format('dddd, D MMMM YYYY [в] HH:mm')}
            </FormHelperText>
        )}
    </div>
);
