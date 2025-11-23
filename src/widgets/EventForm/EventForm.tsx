import React, {FC} from "react";
import styles from "./EventForm.module.css";
import {Input} from "../../shared/ui/Input/Input";
import {TextArea} from "../../shared/ui/TextArea/TextArea";
import {Event} from "../../shared/eventServiceTypes/EventServiceTypesAndInterfaces";

interface EventFormProps{
    eventData:Event,
    InputChange: (paramName:string, payload:string)=>void,
    TextAreaChange: (paramName:string, payload:string)=>void,
}


export const EventForm: FC<EventFormProps> = ({eventData, InputChange, TextAreaChange}) => {

    return(
        <div className={styles.editBlock}>
            <div className={styles.nameAndDescription}>
                <Input
                    className={styles.editPageInput}
                    placeholder="Название мероприятия"
                    value={eventData.name}
                    onChange = {(e) => InputChange("name", e.target.value)}
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
                    onChange = {(e) => InputChange("location", e.target.value)}
                />
                <Input
                    className={styles.editPageInput}
                    placeholder="Дата"
                    value={eventData.metadata.datetime}
                    onChange = {(e) => InputChange("datetime", e.target.value)}
                />
            </div>
        </div>
    )
}


