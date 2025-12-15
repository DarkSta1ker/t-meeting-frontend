import React, {FC, useState, useEffect} from "react";
import styles from "./EventForm.module.css";
import {EventMetadataField, EventBaseField, EventListItem, EventNew} from "../../shared/types/event";
import TextField from "@mui/material/TextField";
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import { FormHelperText } from "@mui/material";
dayjs.extend(utc);
dayjs.extend(timezone);

const NSK_TIMEZONE = 'Asia/Novosibirsk';

interface EventFormProps{
    eventData:EventListItem|EventNew,
    handleBaseFieldChange:(paramName:EventBaseField, payload:string)=>void,
    handleMetadataFieldChange:(paramName:EventMetadataField, payload:string)=>void,
    TextAreaChange: (paramName:string, payload:string)=>void,
}

export const EventForm: FC<EventFormProps> = ({
                                                  eventData,
                                                  handleBaseFieldChange,
                                                  handleMetadataFieldChange,
                                                  TextAreaChange
                                              }) => {
    const [dateTimeValue, setDateTimeValue] = useState<Dayjs | null>(() => {
        if (eventData.metadata.datetime) {
            const date = dayjs.utc(eventData.metadata.datetime).tz(NSK_TIMEZONE);
            return date.isValid() ? date : null;
        }
        return null;
    });
    const [dateError, setDateError] = useState<string>('');
    const [touched, setTouched] = useState(false);

    useEffect(() => {
        if (eventData.metadata.datetime) {
            const date = dayjs.utc(eventData.metadata.datetime).tz(NSK_TIMEZONE);
            if (date.isValid()) {
                setDateTimeValue(date);
                validateDate(date);
            } else {
                setDateError('Неверный формат даты');
            }
        } else {
            setDateTimeValue(null);
        }
    }, [eventData.metadata.datetime]);
    const validateDate = (date: Dayjs): boolean => {
        const now = dayjs().tz(NSK_TIMEZONE);
        const errors: string[] = [];
        if (!date.isValid()) {
            setDateError('Неверный формат даты');
            return false;
        }
        if (date.isBefore(now, 'day')) {
            errors.push('Дата не может быть в прошлом');
        }
        const maxFutureDate = now.add(2, 'year');
        if (date.isAfter(maxFutureDate)) {
            errors.push('Дата не может быть более чем на 2 года вперед');
        }

        if (errors.length > 0) {
            setDateError(errors.join('. '));
            return false;
        }

        setDateError('');
        return true;
    };

    const handleDateTimeChange = (newValue: Dayjs | null) => {
        setDateTimeValue(newValue);
        setTouched(true);

        if (newValue && newValue.isValid()) {
            if (validateDate(newValue)) {
                try {
                    const isoString = newValue.tz(NSK_TIMEZONE).utc().toISOString();
                    handleMetadataFieldChange("datetime", isoString);
                } catch (error) {
                    console.error('Ошибка при конвертации даты:', error);
                    setDateError('Ошибка сохранения даты');
                }
            } else {
                handleMetadataFieldChange("datetime", "");
            }
        } else {
            handleMetadataFieldChange("datetime", "");
            if (!newValue) {
                setDateError('Дата обязательна');
            } else {
                setDateError('Неверный формат даты');
            }
        }
    };

    const handleBlur = () => {
        setTouched(true);
        if (dateTimeValue) {
            validateDate(dateTimeValue);
        } else {
            setDateError('Дата обязательна');
        }
    };

    return (
            <div className={styles.editBlock}>
                <div className={styles.nameAndTimeAndLocation}>
                    <TextField
                        id="outlined-basic"
                        label="Название мероприятия"
                        variant="outlined"
                        sx={{ width: "100%" }}
                        value={eventData.name}
                        onChange={(e) => handleBaseFieldChange("name", e.target.value)}
                        required
                        error={!eventData.name && touched}
                        helperText={!eventData.name && touched ? "Название обязательно" : ""}
                        onBlur={() => setTouched(true)}
                    />
                    <div className={styles.timeAndPlace}>
                        <TextField
                            id="location-input"
                            label="Место проведения"
                            variant="outlined"
                            sx={{ width: "100%" }}
                            value={eventData.metadata.location}
                            onChange={(e) => handleMetadataFieldChange("location", e.target.value)}
                            required
                            onBlur={() => setTouched(true)}
                        />

                        <div style={{ width: "100%" }}>
                            <DateTimePicker
                                label="Дата и время проведения (НСК)"
                                value={dateTimeValue}
                                onChange={handleDateTimeChange}
                                sx={{ width: "100%" }}
                                ampm={false}
                                format="DD.MM.YYYY HH:mm"
                                timeSteps={{ minutes: 30 }}
                                minDate={dayjs().tz(NSK_TIMEZONE).startOf('day')}
                                maxDate={dayjs().tz(NSK_TIMEZONE).add(2, 'year')}
                                slotProps={{
                                    textField: {
                                        error: !!dateError && touched,
                                        required: true,
                                        onBlur: handleBlur,
                                    },
                                    actionBar: {
                                        actions: ['accept', 'cancel', 'today', 'clear']
                                    }
                                }}
                            />

                            {dateError && touched && (
                                <FormHelperText error sx={{ mt: 0.5 }}>
                                    {dateError}
                                </FormHelperText>
                            )}

                            {dateTimeValue && !dateError && (
                                <FormHelperText sx={{ mt: 0.5, color: 'green' }}>
                                    {dateTimeValue.format('dddd, D MMMM YYYY [в] HH:mm')}
                                </FormHelperText>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.description}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Описание мероприятия"
                        multiline
                        rows={16}
                        sx={{
                            height: "100%",
                            width: "100%",
                        }}
                        value={eventData.content[0].payload.join(' ')}
                        onChange={(e) => TextAreaChange("promotext", e.target.value)}
                        required
                    />
                </div>
            </div>
    );
};