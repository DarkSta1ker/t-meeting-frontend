import {SelectChangeEvent} from '@mui/material';
import TextField from '@mui/material/TextField';
import {Dayjs} from 'dayjs';
import React, {ChangeEvent, FC, useCallback, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useEvent} from '../../hooks/useEvent';
import {useEventFormValidation} from '../../hooks/useEventFormValidation';
import {ROUTES} from '../../shared/constants/constants';
import {
    EventBaseField,
    EventContentBlock,
    EventListItem,
    EventMetadataField,
    EventNew,
    InteractivePoints,
    MapBlock,
    PromoTextBlock,
    TimeLineBlock
} from '../../shared/types/event';
import {getTZTimeAndDate} from '../../shared/utils/formatTimeAndData';
import styles from './EventForm.module.css';
import {EventActionButtons} from './FormElements/EventActionButtons';
import {EventDateTimeField} from './FormElements/EventDateTimeField';
import {EventMap} from './FormElements/EventMap';
import {EventNameField} from './FormElements/EventNameField';
import {EventStatusRadioGroup} from './FormElements/EventStatusRadioGroup';
import {EventTimePoints} from './FormElements/EventTimePoints';
import {InteractivePointsBlock} from './FormElements/InteractivePoints';

interface EventFormProps {
    eventData: EventListItem | EventNew;
    handleBaseFieldChange: (paramName: EventBaseField, payload: string) => void;
    handleMetadataFieldChange: (paramName: EventMetadataField, payload: string) => void;
    TextAreaChange: (payload: string) => void;
    handleChangeStatus: (paramName: string) => void;
    handlePostOrUpdate: () => void;
    handleUpdateTimeLine: (block: { name: string, time: string }[]) => void;
    handleUpdateMapBlock: (block: { background: string, points: { x: number; y: number; text: string }[] }) => void;
    handleUpdateInteractivePointsBlock: (block: {
        background: string,
        points: {
            x: number;
            y: number;
            text: string;
            timeline?: {
                name: string;
                time: string;
            }[]
        }[]
    }) => void;
}

export const EventForm: FC<EventFormProps> = ({
                                                  eventData,
                                                  handleBaseFieldChange,
                                                  handleMetadataFieldChange,
                                                  TextAreaChange,
                                                  handleChangeStatus,
                                                  handlePostOrUpdate,
                                                  handleUpdateTimeLine,
                                                  handleUpdateMapBlock,
                                                  handleUpdateInteractivePointsBlock,
                                              }) => {
    const {eventId} = useParams<{ eventId: string }>();
    const nav = useNavigate();
    const {deleteEvent, isLoading} = useEvent();
    const maxSimbols = 2000;
    const {
        errors,
        touched,
        hasErrors,
        validateName,
        validateDate,
        validateForm,
        handleBlur,
        setErrors,
        setTouched,
    } = useEventFormValidation({
        initialName: eventData.name,
        initialDate: eventData.metadata.datetime ? getTZTimeAndDate(eventData.metadata.datetime) : null,
    });

    useEffect(() => {
        if (eventData.name) {
            const nameError = validateName(eventData.name);
            setErrors((prev) => ({...prev, name: nameError}));
        }

        if (eventData.metadata.datetime) {
            const date = getTZTimeAndDate(eventData.metadata.datetime);
            if (date.isValid()) {
                const dateError = validateDate(date);
                setErrors((prev) => ({...prev, date: dateError}));
            }
        }
    }, [eventData.name, eventData.metadata.datetime]);

    const handleCancel = useCallback(() => {
        nav(ROUTES.EVENTS_LIST);
    }, [nav]);

    const handleDeleteEvent = useCallback(async () => {
        if (eventId) {
            deleteEvent(eventId)
                .then(() => {
                    console.log('Event deleted');
                    nav(ROUTES.EVENTS_LIST);
                })
                .catch(error => console.log('Error while fetching deleteEvent: ', error));
        }
    }, [deleteEvent, eventId, nav]);

    const handleDateTimeChange = useCallback((newValue: Dayjs | null) => {
        setTouched((prev) => ({...prev, date: true}));

        if (newValue?.isValid()) {
            const error = validateDate(newValue);
            setErrors((prev) => ({...prev, date: error}));

            if (!error) {
                try {
                    const isoString = newValue.utc().toISOString();
                    handleMetadataFieldChange('datetime', isoString);
                } catch (error) {
                    setErrors((prev) => ({...prev, date: 'Ошибка сохранения даты'}));
                    handleMetadataFieldChange('datetime', '');
                }
            } else {
                handleMetadataFieldChange('datetime', '');
            }
        } else {
            handleMetadataFieldChange('datetime', '');
            setErrors((prev) => ({
                ...prev,
                date: newValue ? 'Неверный формат даты' : 'Поле даты должно быть заполнено'
            }));
        }
    }, [validateDate, handleMetadataFieldChange, setErrors, setTouched]);

    const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = validateName(value);

        setTouched((prev) => ({...prev, name: true}));
        setErrors((prev) => ({...prev, name: error}));
        handleBaseFieldChange('name', value);
    }, [validateName, handleBaseFieldChange, setErrors, setTouched]);

    const handleStatus = useCallback((e: SelectChangeEvent) => {
        handleChangeStatus(e.target.value);
    }, [handleChangeStatus]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        const currentDate = eventData.metadata.datetime
            ? getTZTimeAndDate(eventData.metadata.datetime)
            : null;

        const isValid = validateForm(eventData.name, currentDate);
        if (!isValid) {
            return;
        }

        handlePostOrUpdate();
    }, [eventData, validateForm, handlePostOrUpdate]);

    const findTimeLineBlock = (content: EventContentBlock[]): TimeLineBlock['payload'] => {
        const block = content.find((item): item is TimeLineBlock =>
            item.block === 'timeline'
        );
        return block?.payload || [];
    };
    const findMapBlock = (content: EventContentBlock[]): MapBlock['payload'] => {
        const block = content.find((item): item is MapBlock =>
            item.block === 'map'
        );
        return block?.payload || {background: '', points: []};
    };
    const findInteractivePointsBlock = (content: EventContentBlock[]): InteractivePoints['payload'] => {
        const block = content.find((item): item is InteractivePoints =>
            item.block === 'interactive-points'
        );
        return block?.payload || {background: '', points: []};
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.container}>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Основная информация</h3>

                    <div className={styles.grid}>
                        <EventNameField
                            value={eventData.name}
                            error={touched.name && !!errors.name}
                            helperText={touched.name ? errors.name : ''}
                            onChange={handleNameChange}
                            onBlur={() => handleBlur('name')}
                        />

                        <TextField
                            label="Место проведения"
                            fullWidth
                            sx={{
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#000000',
                                }
                            }}
                            value={eventData.metadata.location}
                            onChange={(e) => handleMetadataFieldChange('location', e.target.value)}
                        />

                        <EventDateTimeField
                            value={eventData.metadata.datetime ? getTZTimeAndDate(eventData.metadata.datetime) : null}
                            errorText={errors.date}
                            touched={touched.date}
                            onChange={handleDateTimeChange}
                            onBlur={() => handleBlur('date')}
                        />

                        <EventStatusRadioGroup
                            eventId={eventId}
                            value={eventData.status}
                            onChange={handleStatus}
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Описание</h3>
                    <TextField
                        multiline
                        fullWidth
                        minRows={3}
                        maxRows={14}
                        sx={{
                            '& .MuiFormHelperText-root': {
                                marginLeft: 0,
                            }
                        }}
                        inputProps={{maxLength: maxSimbols}}
                        value={eventData.content.find((block): block is PromoTextBlock => block.block === 'promo-text')?.payload.join('') || ''}
                        onChange={(e) => TextAreaChange(e.target.value)}
                        helperText={`${eventData.content.find((block): block is PromoTextBlock => block.block === 'promo-text')?.payload.join('').length}/${maxSimbols}`}
                    />
                </div>

                <EventTimePoints
                    handleUpdateTimeLine={handleUpdateTimeLine}
                    block={findTimeLineBlock(eventData.content)}
                />

                <EventMap
                    onUpdate={handleUpdateMapBlock}
                    payload={findMapBlock(eventData.content)}
                />

                <InteractivePointsBlock
                    onUpdate={handleUpdateInteractivePointsBlock}
                    payload={findInteractivePointsBlock(eventData.content)}
                />

                <EventActionButtons
                    eventId={eventId}
                    onCancel={handleCancel}
                    onDelete={eventId ? handleDeleteEvent : undefined}
                    onSubmit={handlePostOrUpdate}
                    disabled={hasErrors}
                    isLoading={isLoading}
                />

            </div>

        </form>
    );
};
