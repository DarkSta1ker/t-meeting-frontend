import React, {type FC, useEffect} from "react";
import styles from "./EventPage.module.css";
import {TextBlock} from "../../shared/blocks/TextBlock/TextBlock";
import {Calendar, MapPinIcon} from "lucide-react";
import {useParams} from "react-router-dom";
import {useEvent} from "../../hooks/useEvent";
import {useEventForm} from "../../hooks/useEventForm";
import {defaultEvent} from "../../shared/types/event";
import {Event} from "../../shared/types/event";
import cn from "classnames";


export const EventPage: FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const {getEvent, isLoading} = useEvent();
    const {eventData, setEventData} = useEventForm<Event>(defaultEvent);
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
            {
                isLoading ? <div>Загрузка...</div>:
                    <>
                        <div className={styles.board}>
                            <div className={styles.eventNameBox}>
                                <TextBlock className={styles.eventTextBlock}>{eventData.name}</TextBlock>
                            </div>
                            <div className={styles.eventDescriptionBlock}>
                                <TextBlock className={styles.eventDescription}>{eventData.content[0].payload.join(' ')}</TextBlock>
                            </div>
                            <div className={styles.dataAndPlaceBlock}>
                                <div className={styles.dataBlock}>
                                    <TextBlock className={styles.data}>{eventData.metadata.datetime}</TextBlock>
                                    <Calendar/>
                                </div>
                                <div className={styles.placeBlock}>
                                    <TextBlock className={styles.place}>{eventData.metadata.location}</TextBlock>
                                    <MapPinIcon/>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}