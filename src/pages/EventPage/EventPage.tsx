import React, {type FC, useEffect} from "react";
import styles from "./EventPage.module.css";
import {Calendar, MapPinIcon} from "lucide-react";
import {useParams} from "react-router-dom";
import {useEvent} from "../../hooks/useEvent";
import {useEventForm} from "../../hooks/useEventForm";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Novosibirsk');
const NSK_TIMEZONE = 'Asia/Novosibirsk';

export const EventPage: FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const {getEvent, isLoading} = useEvent();
    const {eventData, setEventData} = useEventForm();
    useEffect(()=>{
        const loadEvent = async()=>{
            if (!eventId){
                console.log("No eventId found");
                return;
            }
            const result = await getEvent(eventId);
            if(result.status==="Success"){
                console.log("Event loaded");
                setEventData(result.payload);
            }
            else{
                console.log(`Error ${result.payload}`);
            }
        }
        loadEvent();
    },[getEvent, eventId, setEventData]);

    return (
        <div className={styles.eventPage}>
            <div className={styles.board}>
                {
                    isLoading ?
                        <div className={styles.loading}>
                            <Typography
                                variant="h2"
                                sx={{
                                    height:'70px',
                                    display:'flex',
                                    alignItems: 'center',
                                }}
                            >
                                Загрузка...
                            </Typography>
                        </div>
                        :
                        <>
                            <div className={styles.eventNameBox}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        height:'70px',
                                        display:'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    {eventData.name}
                                </Typography>
                            </div>
                            <div className={styles.editBlock}>
                                <div className={styles.description}>
                                    <TextField
                                        id="standard-multiline"
                                        label="Описание мероприятия"
                                        multiline
                                        rows={16}
                                        sx={{
                                            height: "100%",
                                            width: "100%",
                                        }}
                                        value={eventData.content[0].payload.join(' ')}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                    />
                                </div>
                                <div className={styles.timeAndPlace}>
                                    <div className={styles.textFieldWithIcon}>
                                        <TextField
                                            id="standard-read-only-input"
                                            variant="standard"
                                            label="Дата"
                                            sx={{
                                            }}
                                            value={dayjs.utc(eventData.metadata.datetime).tz(NSK_TIMEZONE).format('DD.MM.YYYY HH:mm')}
                                            slotProps={{
                                                input: {
                                                    readOnly: true,
                                                },
                                            }}
                                        />
                                        <Calendar/>
                                    </div>
                                    <div className={styles.textFieldWithIcon}>
                                        <TextField
                                            id="standard-read-only-input"
                                            label="Место проведения"
                                            variant="standard"
                                            sx={{
                                            }}
                                            value={eventData.metadata.location}
                                            slotProps={{
                                                input: {
                                                    readOnly: true,
                                                },
                                            }}
                                        />
                                        <MapPinIcon/>
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}