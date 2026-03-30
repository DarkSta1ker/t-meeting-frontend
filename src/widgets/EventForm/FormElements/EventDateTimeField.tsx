import {FormHelperText} from '@mui/material';
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
    const changeOpen = () => {
        setOpen(prev => !prev);
    };
    return (
        <div style={{width: '100%'}}>
            <DateTimePicker
                open={open}
                onClose={changeOpen}
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
                        error: !!errorText && touched,
                        onBlur,
                        onClick: changeOpen,
                    },
                    actionBar: {
                        actions: ['accept', 'cancel', 'today', 'clear'],
                        sx: {
                            '& .MuiButton-root': {
                                color: '#000000', // чёрный цвет текста для всех кнопок
                            }
                        }
                    },
                    openPickerIcon: {
                        onClick: changeOpen
                    }
                }}
                {...props}
            />

            {errorText && touched && (
                <FormHelperText error sx={{mt: 0.5}}>
                    {errorText}
                </FormHelperText>
            )}

            {value && !errorText && (
                <FormHelperText sx={{mt: 0.5, fontSize: '0.75rem', color: touched && errorText ? 'red' : '#333'}}>
                    {errorText || (value ? value.format('dddd, D MMMM YYYY [в] HH:mm') : '')}
                </FormHelperText>
            )}
        </div>
    );
};
