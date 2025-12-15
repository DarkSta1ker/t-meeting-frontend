import React, {type FC, useCallback, useEffect} from "react";
import {TextBlock} from "../../shared/blocks/TextBlock/TextBlock";
import { useNavigate } from 'react-router-dom';
import {EllipsisVertical, Calendar, MapPinIcon, CirclePlus, Circle, House} from 'lucide-react';
import { DropdownMenu } from "radix-ui";
import styles from './EventsListPage.module.css';
import {useEvent} from "../../hooks/useEvent";
import {useEvents} from "../../hooks/useEvents";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {EventStatusCircle} from "../../shared/ui/EventStatus/EventStatusCircle";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Novosibirsk');
const NSK_TIMEZONE = 'Asia/Novosibirsk';
export const EventsListPage: FC = () => {

    const nav=useNavigate();
    const { deleteEvent, changeStatus} = useEvent();
    const {events, getAllEvents, isLoading} = useEvents();

    useEffect(()=>{
        getAllEvents()
    },[])


    const handleUpdateEventList = useCallback(async ()=>{
        const result = await getAllEvents();
        if(result.status==="Success"){
            console.log("Events list updated");
        }
        else{
            console.log(`Error ${result.payload}`);
        }
    },[getAllEvents])

    const handleDeleteEvent= useCallback(async(eventId:string)=>{
        const result = await deleteEvent(eventId);
        if(result.status==="Success"){
            console.log("Event deleted");
        }
        else{
            console.log(`Error ${result.payload}`);
        }
        await handleUpdateEventList();
    },[deleteEvent, handleUpdateEventList]);

    const handleChangeStatus = useCallback(async(eventId:string)=>{
        await changeStatus(eventId);
        await handleUpdateEventList();
    },[handleUpdateEventList, changeStatus]);

    const handleEditEvent = (eventId:string)=>{
        nav(`/editEvent/${eventId}`);
    }

    const handleEventPage = (eventId:string)=>{
        nav(`/event/${eventId}`);
    }

    return (
        <div className={styles.eventsListPage}>
            <div className={styles.board}>
                <Typography
                    variant="h6"
                    sx={{
                        height:'64px',
                        display:'flex',
                        alignItems: 'center',
                    }}
                >Список мероприятий</Typography>
                <div className={styles.eventsListBlock}>
                    {
                        isLoading?
                            <Typography
                                variant="h6"
                                sx={{
                                    display:'flex',
                                    alignItems: 'center',
                                }}
                            >Загрузка мероприятий...</Typography>
                            :
                            <>
                                {
                                    events?
                                        events.map((event)=> (
                                            <div key={event.id} className={styles.eventBlock}>
                                                <div  className={styles.eventBlockCardBox}>
                                                    <div
                                                        className={styles.eventBlockCard}
                                                        onClick={()=>handleEventPage(event.id)}
                                                    >
                                                        <div className={styles.nameAndDescriptionListPage}>
                                                            <Typography
                                                                variant="h6"
                                                                sx={{
                                                                    display:'flex',
                                                                    alignItems: 'center',
                                                                }}
                                                            >{event.name}</Typography>
                                                            <TextBlock className={styles.eventDescription}>{event.content[0].payload.join(' ')}</TextBlock>
                                                        </div>
                                                        <div className={styles.dataAndPlace}>
                                                            <div className={styles.dataBlock}>
                                                                <TextBlock className={styles.data}>
                                                                    {dayjs.utc(event.metadata.datetime).tz(NSK_TIMEZONE).format('DD.MM.YYYY HH:mm')}
                                                                </TextBlock>
                                                                <Calendar/>
                                                            </div>
                                                            <div className={styles.placeBlock}>
                                                                <TextBlock className={styles.place}>{event.metadata.location}</TextBlock>
                                                                <MapPinIcon/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.dropDownMenu}>
                                                        <DropdownMenu.Root>
                                                            <DropdownMenu.Trigger asChild>
                                                                <button className={styles.dropDownMenuButton} aria-label="Actions">
                                                                    <EllipsisVertical/>
                                                                </button>
                                                            </DropdownMenu.Trigger>

                                                            <DropdownMenu.Portal>
                                                                <DropdownMenu.Content className={styles.dropdownMenuContent} side="left" sideOffset={5}>
                                                                    <DropdownMenu.Item className={styles.dropdownMenuItem} onSelect={()=>handleEventPage(event.id)}>
                                                                        Страница мероприятия
                                                                    </DropdownMenu.Item>
                                                                    <DropdownMenu.Item className={styles.dropdownMenuItem} onSelect={()=>handleChangeStatus(event.id)}>
                                                                        Изменить статус
                                                                    </DropdownMenu.Item>
                                                                    <DropdownMenu.Item className={styles.dropdownMenuItem} onSelect={()=>handleEditEvent(event.id)}>
                                                                        Редактировать
                                                                    </DropdownMenu.Item>
                                                                    <DropdownMenu.Item className={styles.dropdownMenuItem} onSelect={()=>handleDeleteEvent(event.id)}>
                                                                        Удалить
                                                                    </DropdownMenu.Item>
                                                                    <DropdownMenu.Arrow className={styles.dropdownMenuArrow} />

                                                                </DropdownMenu.Content>
                                                            </DropdownMenu.Portal>
                                                        </DropdownMenu.Root>


                                                    </div>
                                                </div>
                                                <div className={styles.infoBlock}>
                                                    <Typography
                                                        variant="body2"
                                                    >Создано: {dayjs.utc(event.createdAt).tz(NSK_TIMEZONE).format('DD.MM.YYYY HH:mm')}   Обновлено: {dayjs.utc(event.updatedAt).tz(NSK_TIMEZONE).format('DD.MM.YYYY HH:mm')}</Typography>
                                                    <div className={styles.status}>
                                                        <Typography
                                                            variant="body2"
                                                        >Cтатус: {event.status}</Typography>
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
                    <IconButton onClick={()=>nav('/createEvent')}
                                sx={{
                                    position: 'absolute',
                                    backgroundColor: "transparent",
                                    color: "#757575",
                                    bottom: '15px',
                                    right: '56px',
                                    '&:hover': {
                                        borderRadius: '25px',
                                        backgroundColor: "#cfd0d5",
                                    }
                                }}
                    >
                        <CirclePlus size={30}/>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

