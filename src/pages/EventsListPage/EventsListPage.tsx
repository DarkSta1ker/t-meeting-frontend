import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import {Calendar, CirclePlus, EllipsisVertical, MapPinIcon} from "lucide-react";
import {DropdownMenu} from "radix-ui";
import React, {type FC, useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useEvent} from "../../hooks/useEvent";
import {useEvents} from "../../hooks/useEvents";
import {EventStatusCircle} from "../../shared/ui/EventStatus/EventStatusCircle";
import styles from "./EventsListPage.module.css";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Novosibirsk");
const NSK_TIMEZONE = "Asia/Novosibirsk";
export const EventsListPage: FC = () => {

    const nav = useNavigate();
    const {deleteEvent, changeStatus} = useEvent();
    const {events, getAllEvents, isLoading} = useEvents();

    useEffect(() => {
        getAllEvents();
    }, []);

    const handleUpdateEventList = useCallback(async () => {
        const result = await getAllEvents();
        if (result.status === "Success") {
            console.log("Events list updated");
        } else {
            console.log(`Error ${result.payload}`);
        }
    }, [getAllEvents]);

    const handleDeleteEvent = useCallback(async (eventId: string) => {
        const result = await deleteEvent(eventId);
        if (result.status === "Success") {
            console.log("Event deleted");
        } else {
            console.log(`Error ${result.payload}`);
        }
        await handleUpdateEventList();
    }, [deleteEvent, handleUpdateEventList]);

    const handleChangeStatus = useCallback(async (eventId: string) => {
        await changeStatus(eventId);
        await handleUpdateEventList();
    }, [handleUpdateEventList, changeStatus]);

    const handleEditEvent = (eventId: string) => {
        nav(`/editEvent/${eventId}`);
    };

    const handleEventPage = (eventId: string) => {
        nav(`/event/${eventId}`);
    };

    const handleGetRuStatus = (status: string) => {
        switch (status) {
            case "draft":
                return "Редактирование";
            case "cancelled":
                return "Отменено";
            case "archived":
                return "Архивировано";
            default:
                return "Опубликовано";
        }
    };
    return (
        <div className={styles.eventsListPage}>
            <div className={styles.board}>
                <Typography
                    variant="h5"
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        height: "64px",
                    }}
                >Список мероприятий</Typography>
                <div className={styles.eventsListBlock}>
                    {
                        isLoading ?
                            <Typography
                                variant="h6"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >Загрузка мероприятий...</Typography>
                            :
                            <>
                                {
                                    events ?
                                        events.map((event) => (
                                            <div key={event.id} className={styles.eventBlock}>
                                                <div className={styles.eventBlockCardBox}>
                                                    <div
                                                        className={styles.eventBlockCard}
                                                    >
                                                        <div
                                                            className={styles.nameAndDescriptionListPage}
                                                            onClick={() => handleEventPage(event.id)}
                                                        >
                                                            <Typography
                                                                variant="h6"
                                                                sx={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    whiteSpace: "nowrap",
                                                                    maxWidth: "90%",
                                                                }}
                                                            >{event.name}</Typography>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    width: "95%",
                                                                    margin: 0,
                                                                    display: "-webkit-box",
                                                                    WebkitLineClamp: 3,
                                                                    WebkitBoxOrient: "vertical",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    maxHeight: "4.5em",
                                                                    lineHeight: 1.5,
                                                                }}
                                                            >
                                                                {event.content[0].payload.join(" ")}
                                                            </Typography>
                                                        </div>
                                                        <div
                                                            className={styles.dataAndPlace}
                                                            onClick={() => handleEventPage(event.id)}
                                                        >
                                                            <div className={styles.dataBlock}>
                                                                <Typography
                                                                    variant="body1"
                                                                    sx={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                    }}
                                                                >
                                                                    {dayjs.utc(event.metadata.datetime).tz(NSK_TIMEZONE).format("DD.MM.YYYY HH:mm")}
                                                                </Typography>
                                                                <Calendar/>
                                                            </div>
                                                            <div className={styles.placeBlock}>
                                                                <Typography
                                                                    variant="body1"
                                                                    sx={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis",
                                                                        whiteSpace: "nowrap",
                                                                    }}
                                                                >{event.metadata.location}</Typography>

                                                                <MapPinIcon/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.dropDownMenu}>
                                                        <DropdownMenu.Root>
                                                            <DropdownMenu.Trigger asChild>
                                                                <button className={styles.dropDownMenuButton}
                                                                        aria-label="Actions">
                                                                    <EllipsisVertical/>
                                                                </button>
                                                            </DropdownMenu.Trigger>

                                                            <DropdownMenu.Portal>
                                                                <DropdownMenu.Content
                                                                    className={styles.dropdownMenuContent} side="left"
                                                                    sideOffset={5}>
                                                                    <DropdownMenu.Item
                                                                        className={styles.dropdownMenuItem}
                                                                        onSelect={() => handleEventPage(event.id)}>
                                                                        Страница мероприятия
                                                                    </DropdownMenu.Item>
                                                                    <DropdownMenu.Item
                                                                        className={styles.dropdownMenuItem}
                                                                        onSelect={() => handleEditEvent(event.id)}>
                                                                        Редактировать
                                                                    </DropdownMenu.Item>
                                                                    <DropdownMenu.Item
                                                                        className={styles.dropdownMenuItem}
                                                                        onSelect={() => handleDeleteEvent(event.id)}>
                                                                        Удалить
                                                                    </DropdownMenu.Item>
                                                                    <DropdownMenu.Arrow
                                                                        className={styles.dropdownMenuArrow}/>

                                                                </DropdownMenu.Content>
                                                            </DropdownMenu.Portal>
                                                        </DropdownMenu.Root>

                                                    </div>
                                                </div>
                                                <div className={styles.infoBlock}>
                                                    <Typography
                                                        variant="body2"
                                                    >Создано: {dayjs.utc(event.createdAt).tz(NSK_TIMEZONE).format("DD.MM.YYYY HH:mm")} |
                                                        Обновлено: {dayjs.utc(event.updatedAt).tz(NSK_TIMEZONE).format("DD.MM.YYYY HH:mm")}</Typography>
                                                    <div className={styles.status}>
                                                        <Typography
                                                            variant="body2"
                                                        >Cтатус: {handleGetRuStatus(event.status)}</Typography>
                                                        <EventStatusCircle status={event.status}/>
                                                    </div>
                                                </div>
                                            </div>

                                        ))
                                        :
                                        <div className={styles.noEventsBlock}>
                                            Пока что тут нет мероприятий, вы можете добавить их с помощью кнопки ниже.
                                        </div>
                                }
                            </>
                    }
                    <IconButton onClick={() => nav("/createEvent")}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "#cfd0d5",
                                        borderRadius: "25px",
                                    },
                                    "backgroundColor": "transparent",
                                    "bottom": "15px",
                                    "color": "#757575",
                                    "position": "absolute",
                                    "right": "56px",
                                }}
                    >
                        <CirclePlus size={30}/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

