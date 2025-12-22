import {Box, Paper, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import {Calendar, MapPinIcon} from "lucide-react";
import React, {type FC, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useEvent} from "../../hooks/useEvent";
import {useEventForm} from "../../hooks/useEventForm";
import styles from "./EventPage.module.css";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Novosibirsk");
const NSK_TIMEZONE = "Asia/Novosibirsk";

export const EventPage: FC = () => {
    const {eventId} = useParams<{ eventId: string }>();
    const {getEvent, isLoading} = useEvent();
    const {eventData, setEventData} = useEventForm();
    useEffect(() => {
        const loadEvent = async () => {
            if (!eventId) {
                console.log("No eventId found");
                return;
            }
            const result = await getEvent(eventId);
            if (result.status === "Success") {
                console.log("Event loaded");
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
                            <Typography
                                variant="h2"
                                sx={{
                                    height: "70px",
                                    display: "flex",
                                    alignItems: "center",
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
                                        display: "flex",
                                        alignItems: "center",
                                        wordWrap: "break-word",
                                        overflowWrap: "break-word",
                                    }}
                                >
                                    {eventData.name}
                                </Typography>
                            </div>
                            <div className={styles.editBlock}>
                                <div className={styles.description}>
                                    <Box sx={{height: "100%"}}>
                                        <Typography variant="h6" gutterBottom>
                                            Описание мероприятия
                                        </Typography>

                                        <Paper
                                            variant="outlined"
                                            sx={{
                                                p: 2,
                                                minHeight: "100px",
                                                overflow: "auto",
                                                backgroundColor: "background.paper",
                                                width: "100%",
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    whiteSpace: "pre-wrap",
                                                    lineHeight: 1.6,
                                                    wordBreak: "break-word",
                                                }}
                                            >
                                                {eventData.content[0].payload.join(" ")}
                                            </Typography>
                                        </Paper>
                                    </Box>
                                </div>
                                <div className={styles.timeAndPlace}>
                                    <div className={styles.textFieldWithIcon}>
                                        <TextField
                                            id="standard-read-only-input"
                                            variant="standard"
                                            sx={{
                                                pointerEvents: "none",
                                            }}
                                            label="Дата"
                                            value={dayjs.utc(eventData.metadata.datetime).tz(NSK_TIMEZONE).format("DD.MM.YYYY HH:mm")}
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
                                                pointerEvents: "none",
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
    );
};
