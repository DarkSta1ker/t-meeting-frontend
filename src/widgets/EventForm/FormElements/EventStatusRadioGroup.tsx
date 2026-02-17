import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React, { ChangeEvent, FC } from 'react';
import {radioStyles} from '../../../shared/constants/constants';
interface EventStatusRadioGroupProps {
    eventId?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const EventStatusRadioGroup: FC<EventStatusRadioGroupProps> = ({
                                                                          eventId,
                                                                          value,
                                                                          onChange
                                                                      }) => {
    if (!eventId) { return null; }

    return (
        <FormControl>
            <FormLabel id='demo-radio-buttons-group-label'>
                Статус мероприятия
            </FormLabel>
            <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue='Status'
                name='radio-buttons-group'
                value={value}
                onChange={onChange}
            >
                <FormControlLabel
                    value='published'
                    control={<Radio sx={radioStyles.green} />}
                    label='Опубликовано'
                />
                <FormControlLabel
                    value='draft'
                    control={<Radio sx={radioStyles.yellow} />}
                    label='Редактирование'
                />
                <FormControlLabel
                    value='archived'
                    control={<Radio sx={radioStyles.blue} />}
                    label='Архивировано'
                />
                <FormControlLabel
                    value='cancelled'
                    control={<Radio sx={radioStyles.red} />}
                    label='Отменено'
                />
            </RadioGroup>
        </FormControl>
    );
};
