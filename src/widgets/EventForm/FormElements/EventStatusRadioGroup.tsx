import {SelectChangeEvent} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, {FC} from 'react';

interface EventStatusRadioGroupProps {
    eventId?: string;
    value: string;
    onChange: (e: SelectChangeEvent) => void;
}

export const EventStatusRadioGroup: FC<EventStatusRadioGroupProps> = ({
                                                                          eventId,
                                                                          value,
                                                                          onChange
                                                                      }) => {
    if (!eventId) {
        return null;
    }

    return (
        <FormControl>
            <InputLabel
                id="demo-simple-select-label"
                sx={{
                    '&.Mui-focused': {
                        color: '#000000',
                    },
                }}
            >
                Статус мероприятия
            </InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Статус мероприятия"
                onChange={onChange}
            >
                <MenuItem value="published">Опубликовано</MenuItem>
                <MenuItem value="draft">Редактирование</MenuItem>
                <MenuItem value="archived">Архивировано</MenuItem>
                <MenuItem value="cancelled">Отменено</MenuItem>
            </Select>

        </FormControl>
    );
};
