import React, {FC, useState, useEffect, useCallback, ChangeEvent} from "react";
import styles from "./EventForm.module.css";
import {EventMetadataField, EventBaseField, EventListItem, EventNew} from "../../shared/types/event";
import TextField from "@mui/material/TextField";
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import { FormHelperText } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import {useNavigate, useParams} from "react-router-dom";
import {useEvent} from "../../hooks/useEvent";

dayjs.extend(utc);
dayjs.extend(timezone);

const NSK_TIMEZONE = 'Asia/Novosibirsk';

interface EventFormProps{
    eventData:EventListItem|EventNew,
    handleBaseFieldChange:(paramName:EventBaseField, payload:string)=>void,
    handleMetadataFieldChange:(paramName:EventMetadataField, payload:string)=>void,
    TextAreaChange: (paramName:string, payload:string)=>void,
    handleChangeStatus:(paramName:string)=>void,
    handlePostOrUpdate:()=>void,
}

export const EventForm: FC<EventFormProps> = ({
                                                  eventData,
                                                  handleBaseFieldChange,
                                                  handleMetadataFieldChange,
                                                  TextAreaChange,
                                                  handleChangeStatus,
                                                  handlePostOrUpdate,
                                              }) => {
    const [dateTimeValue, setDateTimeValue] = useState<Dayjs | null>(() => {
        if (eventData.metadata.datetime) {
            const date = dayjs.utc(eventData.metadata.datetime).tz(NSK_TIMEZONE);
            return date.isValid() ? date : null;
        }
        return null;
    });
    const { eventId } = useParams<{ eventId: string }>();
    const nav=useNavigate();
    const {deleteEvent, isLoading} = useEvent();
    const [dateErrorText, setDateErrorText] = useState<string>('asd');
    const [touched, setTouched] = useState(false);
    const [nameError, setNameError] = useState(true);
    const [dateError, setDateError] = useState(true);

    const handleCancel = useCallback(() => {
        nav('/eventsList');
    }, [nav]);

    const handleDeleteEvent= useCallback(async()=>{
        if(eventId) {
            const result = await deleteEvent(eventId);
            if (result.status === "Success") {
                console.log("Event deleted");
                nav('/eventsList');
            } else {
                console.log(`Error ${result.payload}`);
            }
        }
        else{
            console.log('Ошибка! Нет id')
        }
    },[deleteEvent, eventId, nav]);
    useEffect(() => {
        if (eventData.metadata.datetime) {
            const date = dayjs.utc(eventData.metadata.datetime).tz(NSK_TIMEZONE);
            if (date.isValid()) {
                setDateTimeValue(date);
                validateDate(date);
            } else {
                setDateErrorText('Неверный формат даты');
            }
        } else {
            setDateTimeValue(null);
        }
    }, [eventData.metadata.datetime]);
    const validateDate = (date: Dayjs): boolean => {
        const now = dayjs().tz(NSK_TIMEZONE);
        const errors: string[] = [];
        if (!date.isValid()) {
            setDateErrorText('Неверный формат даты');
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
            setDateErrorText(errors.join('. '));
            setDateError(true)
            return false;
        }

        setDateErrorText('');
        setDateError(false)
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
                    setDateErrorText('');
                } catch (error) {
                    console.error('Ошибка при конвертации даты:', error);
                    setDateErrorText('Ошибка сохранения даты');
                    handleMetadataFieldChange("datetime", "");
                }
            } else {
                handleMetadataFieldChange("datetime", "");
            }
        } else {
            handleMetadataFieldChange("datetime", "");
            if (!newValue) {
                setDateErrorText('Поле даты должно быть заполнено полностью');
            } else {
                if (newValue.toString().includes('Invalid Date')) {
                    setDateErrorText('Неверный формат даты');
                } else {
                    validateDate(newValue);
                }
            }
        }
    };
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>)=>{
        if(e.target.value!==''){
            setNameError(false)
            handleBaseFieldChange("name", e.target.value)
        }
        else{
            setNameError(true)
        }
    }
    const handleStatus = (e: React.ChangeEvent<HTMLInputElement>) =>{
        handleChangeStatus(e.target.value);
    }
    const handleBlur = () => {
        setTouched(true);
        if (dateTimeValue) {
            validateDate(dateTimeValue);
        } else {
            setDateErrorText('Поле даты должно быть заполнено полностью');
        }
    };

    return (
        <>
            <div className={styles.editBlock}>
                <div className={styles.nameAndTimeAndLocation}>
                    <TextField
                        id="outlined-basic"
                        label="Название мероприятия"
                        variant="outlined"
                        required
                        sx={{ width: "100%" }}
                        value={eventData.name}
                        error={nameError}
                        helperText={nameError && "Название мероприятия обязательно"}
                        onChange={handleNameChange}
                    />
                    <div className={styles.timeAndPlace}>
                        <TextField
                            id="location-input"
                            label="Место проведения"
                            variant="outlined"
                            sx={{ width: "100%" }}
                            value={eventData.metadata.location}
                            onChange={(e) => handleMetadataFieldChange("location", e.target.value)}
                        />

                        <div style={{ width: "100%" }}>
                            <DateTimePicker
                                label="Дата и время проведения (НСК)"
                                value={dateTimeValue}
                                onChange={handleDateTimeChange}
                                sx={{ width: "100%" }}
                                ampm={false}
                                format="DD.MM.YYYY HH:mm"
                                timeSteps={{ minutes: 5 }}
                                minDate={dayjs().tz(NSK_TIMEZONE).startOf('day')}
                                maxDate={dayjs().tz(NSK_TIMEZONE).add(2, 'year')}
                                slotProps={{
                                    textField: {
                                        error: !!dateErrorText && touched,
                                        onBlur: handleBlur,

                                    },
                                    actionBar: {
                                        actions: ['accept', 'cancel', 'today', 'clear']
                                    }
                                }}
                            />

                            {dateErrorText && touched && (
                                <FormHelperText error sx={{ mt: 0.5 }}>
                                    {dateErrorText}
                                </FormHelperText>
                            )}

                            {dateTimeValue && !dateErrorText && (
                                <FormHelperText sx={{ mt: 0.5, color: 'green' }}>
                                    {dateTimeValue.format('dddd, D MMMM YYYY [в] HH:mm')}
                                </FormHelperText>
                            )}
                        </div>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Статус мероприятия</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="Status"
                                name="radio-buttons-group"
                                value={eventData.status}
                                onChange={handleStatus}
                            >
                                <FormControlLabel value="published" control={<Radio
                                    sx={{
                                        color: "#34c658",
                                        '&.Mui-checked': {
                                            color: "#34c658",
                                        },
                                    }}/>} label="Published"/>
                                <FormControlLabel value="draft" control={<Radio sx={{
                                    color: "#fecd00",
                                    '&.Mui-checked': {
                                        color: "#fecd00",
                                    },
                                }}/>} label="Draft" color="#fecd00"/>
                                <FormControlLabel value="archived" control={<Radio sx={{
                                    color: "#00c5ff",
                                    '&.Mui-checked': {
                                        color: "#00c5ff",
                                    },
                                }}/>} label="Archived" color="#00c5ff"/>
                                <FormControlLabel value="cancelled" control={<Radio sx={{
                                    color: "#ec231e",
                                    '&.Mui-checked': {
                                        color: "#ec231e",
                                    },
                                }}/>} label="Cancelled" color="#ec231e"/>
                            </RadioGroup>
                        </FormControl>
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
                    />
                </div>
            </div>
            <div className={styles.buttonsBlock}>
                <Button
                    variant="outlined"
                    onClick={handleCancel}
                    size="large"
                    disabled={isLoading}
                    sx={{
                        color: "#fecd00",
                        borderColor: "#fecd00",
                        fontWeight: 'bold',
                        border: "2px solid #fecd00",
                        '&:hover': {
                            backgroundColor: "rgba(255,249,0,0.26)",
                        }
                    }}
                >
                    Отмена
                </Button>
                {
                    eventId&&
                    <Button
                        variant="outlined"
                        disabled={isLoading}
                        onClick={handleDeleteEvent}
                        size="large"
                        sx={{
                            color: "#ec231e",
                            borderColor: "#ec231e",
                            fontWeight: 'bold',
                            border: "2px solid #ec231e",
                            '&:hover': {
                                backgroundColor: "rgba(255,0,13,0.26)",
                            }
                        }}
                    >
                        Удалить
                    </Button>
                }
                <Button
                    variant="outlined"
                    disabled={nameError||dateError}
                    onClick={handlePostOrUpdate}
                    size="large"
                    sx={{
                        color: "#34c658",
                        borderColor: "#34c658",
                        fontWeight: 'bold',
                        border: "2px solid #34c658",
                        '&:hover': {
                            backgroundColor: "rgba(28,255,0,0.26)",
                        }
                    }}
                >
                    {eventId? "Сохранить":"Отправить"}
                </Button>
            </div>
        </>
    );
};