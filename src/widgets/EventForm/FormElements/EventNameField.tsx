import TextField from '@mui/material/TextField';
import React, {ChangeEvent, FC} from 'react';

interface EventNameFieldProps {
    value: string;
    error: boolean;
    helperText: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
}

export const EventNameField: FC<EventNameFieldProps> = ({
                                                            value,
                                                            error,
                                                            helperText,
                                                            onChange,
                                                            onBlur,
                                                            ...props
                                                        }) => (
    <TextField
        id="outlined-basic"
        label="Название мероприятия"
        variant="outlined"
        required
        sx={{
            width: '100%',
            '& .MuiInputLabel-root.Mui-focused': {

                color: '#000000',
            },
        }}
        value={value}
        error={error}
        helperText={helperText}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
    />
);
