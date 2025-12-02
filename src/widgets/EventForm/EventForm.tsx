import React, {FC} from "react";
import styles from "./EventForm.module.css";
import {Input} from "../../shared/ui/Input/Input";
import {TextArea} from "../../shared/ui/TextArea/TextArea";
import {Event, EventMetadataField, EventBaseField, NewEvent} from "../../shared/types/event";

interface EventFormProps{
    eventData:Event|NewEvent,
    handleBaseFieldChange:(paramName:EventBaseField, payload:string)=>void,
    handleMetadataFieldChange:(paramName:EventMetadataField, payload:string)=>void,
    TextAreaChange: (paramName:string, payload:string)=>void,
}


export const EventForm: FC<EventFormProps> = ({eventData, handleBaseFieldChange, handleMetadataFieldChange, TextAreaChange}) => {

    return(
        <div className={styles.editBlock}>
            <div className={styles.nameAndDescription}>
                <Input
                    className={styles.editPageInput}
                    placeholder="Название мероприятия"
                    value={eventData.name}
                    onChange = {(e) => handleBaseFieldChange("name", e.target.value)}
                />
                <TextArea
                    className={styles.editPageTextArea}
                    placeholder="Описание мероприятия"
                    value={eventData.content[0].payload.join(' ')}
                    onChange = {(e) => TextAreaChange("promotext", e.target.value)}
                />
            </div>
            <div className={styles.timeAndPlace}>
                <Input
                    className={styles.editPageInput}
                    placeholder="Место проведения"
                    value={eventData.metadata.location}
                    onChange = {(e) => handleMetadataFieldChange("location", e.target.value)}
                />
                <Input
                    className={styles.editPageInput}
                    placeholder="Дата"
                    value={eventData.metadata.datetime}
                    onChange = {(e) => handleMetadataFieldChange("datetime", e.target.value)}
                />
            </div>
        </div>
    )
}


