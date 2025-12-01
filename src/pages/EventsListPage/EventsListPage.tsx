import React, {type FC, useCallback} from "react";
import {TextBlock} from "../../shared/blocks/TextBlock/TextBlock";
import {Button} from "../../shared/ui/Button/Button";
import { useNavigate } from 'react-router-dom';
import {EllipsisVertical, Calendar, MapPinIcon, CirclePlus} from 'lucide-react';
import { DropdownMenu } from "radix-ui";
import styles from './EventsListPage.module.css';
import {useEvent} from "../../hooks/useEvent";
import {Event} from "../../shared/types/event";


export const EventsListPage: FC = () => {

    const nav=useNavigate();
    const {events, getAllEvents, deleteEvent, isLoading} = useEvent();

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

    const handleEditEvent = (eventId:string)=>{
        nav(`/editEvent/${eventId}`);
    }

    const handleEventPage = (eventId:string)=>{
        nav(`/event/${eventId}`);
    }

    return (
        <div className={styles.eventsListPage}>
            <div className={styles.board}>
                <TextBlock className={styles.eventsListTextBlock}>Список мероприятий</TextBlock>
                <div className={styles.eventsListBlock}>
                    {
                        isLoading? <div>Загрузка мероприятий...</div> :
                        events.map((event:Event)=>(
                            <div key={event.id} className={styles.eventBlock}>
                                <div className={styles.nameAndDescriptionListPage}>
                                    <TextBlock className={styles.eventName}>{event.name}</TextBlock>
                                    <TextBlock className={styles.eventDescription}>{event.content[0].payload.join(' ')}</TextBlock>
                                </div>
                                <div className={styles.dataAndPlace}>
                                    <div className={styles.dataBlock}>
                                        <TextBlock className={styles.data}>{event.metadata.datetime}</TextBlock>
                                        <Calendar/>
                                    </div>
                                    <div className={styles.placeBlock}>
                                        <TextBlock className={styles.place}>{event.metadata.location}</TextBlock>
                                        <MapPinIcon/>
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
                                                <DropdownMenu.Item className={styles.dropdownMenuItem}>
                                                    Отметить активным
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
                        ))
                    }


                    <Button className={styles.addEventButton} onClick={()=>nav('/createEvent')}>
                        <CirclePlus size={30}/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

