import {Box, Paper, Typography} from '@mui/material';
import {Calendar, MapPinIcon} from 'lucide-react';
import React, {type FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useEvent} from '../../hooks/useEvent';
import {useEventForm} from '../../hooks/useEventForm';
import {Loader} from '../../shared/loader/Loader';
import {ReadOnlyTextField} from '../../shared/ui/ReadOnlyTextField/ReadOnlyTextField';
import {getTimeAndDateString} from '../../shared/utils/formatTimeAndData';
import {getDescription} from '../../shared/utils/helpFunks';
import styles from './EventPage.module.css';

export const EventPage: FC = () => {
    const {eventId} = useParams<{ eventId: string }>();
    const {getEvent, isLoading} = useEvent();
    const {eventData, setEventData} = useEventForm();
    useEffect(() => {
        const loadEvent = async () => {
            if (!eventId) {
                console.log('No eventId found');
                return;
            }
            const result = await getEvent(eventId);
            if (result.status === 'Success') {
                console.log('Event loaded');
                setEventData(result.payload);
            } else {
                console.log(`Error ${result.payload}`);
            }
        };
        loadEvent();
    }, [getEvent, eventId, setEventData]);

    return (
        <div className={styles.eventPage}>
            <div className={styles.board}>
                {
                    isLoading ?
                        <div className={styles.loading}>
                            <Loader/>
                        </div>
                        :
                        <>
                            <div className={styles.eventNameBox}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        overflowWrap: 'break-word',
                                        wordWrap: 'break-word',
                                    }}
                                >
                                    {eventData.name}
                                </Typography>
                            </div>
                            <div className={styles.editBlock}>
                                <div className={styles.description}>
                                    <Box sx={{height: '100%'}}>
                                        <Typography variant="h6" gutterBottom>
                                            Описание мероприятия
                                        </Typography>
                                        <Paper
                                            variant="outlined"
                                            sx={{
                                                backgroundColor: 'background.paper',
                                                minHeight: '100px',
                                                overflow: 'auto',
                                                p: 2,
                                                width: '100%',
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    lineHeight: 1.6,
                                                    whiteSpace: 'pre-wrap',
                                                    wordBreak: 'break-word',
                                                }}
                                            >
                                                {getDescription(eventData)}
                                            </Typography>
                                        </Paper>
                                    </Box>
                                </div>
                                <div className={styles.timeAndPlace}>
                                    <div className={styles.textFieldWithIcon}>
                                        <ReadOnlyTextField
                                            value={getTimeAndDateString(eventData.metadata.datetime)}
                                            label={'Дата'}
                                        />
                                        <Calendar/>
                                    </div>
                                    <div className={styles.textFieldWithIcon}>
                                        <ReadOnlyTextField
                                            value={eventData.metadata.location}
                                            label={'Место проведения'}
                                        />
                                        <MapPinIcon/>
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    );
};
