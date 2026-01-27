import TextField from '@mui/material/TextField';
import React, {FC} from 'react';

interface ReadOnlyTextFieldProps {
    value?: string;
    label?: string;
}

export const ReadOnlyTextField: FC<ReadOnlyTextFieldProps> = ({value, label}) => {
    return (<TextField
        id='standard-read-only-input'
        variant='standard'
        sx={{
            pointerEvents: 'none',
        }}
        label={label}
        value={value}
        slotProps={{
            input: {
                readOnly: true,
            },
        }}
    />);
};
