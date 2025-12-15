import React, {FC} from "react";
import styles from "./EventForm.module.css";
import {EventMetadataField, EventBaseField, EventListItem, EventNew} from "../../shared/types/event";
import TextField from "@mui/material/TextField";
interface EventFormProps{
    eventData:EventListItem|EventNew,
    handleBaseFieldChange:(paramName:EventBaseField, payload:string)=>void,
    handleMetadataFieldChange:(paramName:EventMetadataField, payload:string)=>void,
    TextAreaChange: (paramName:string, payload:string)=>void,
}


export const EventForm: FC<EventFormProps> = ({eventData, handleBaseFieldChange, handleMetadataFieldChange, TextAreaChange}) => {

    return(
        <div className={styles.editBlock}>
            <div className={styles.nameAndTimeAndLocation}>
                <TextField
                    id="outlined-basic"
                    label="Название мероприятия"
                    variant="outlined"
                    sx={{
                        width: "100%",
                    }}
                    value={eventData.name}
                    onChange = {(e) => handleBaseFieldChange("name", e.target.value)}
                />
                <div className={styles.timeAndPlace}>
                    <TextField
                        id="outlined-basic"
                        label="Дата"
                        variant="outlined"
                        sx={{
                            width: "100%",
                        }}
                        value={eventData.metadata.datetime}
                        onChange = {(e) => handleMetadataFieldChange("datetime", e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Место проведения"
                        variant="outlined"
                        sx={{
                            width: "100%",
                        }}
                        value={eventData.metadata.location}
                        onChange = {(e) => handleMetadataFieldChange("location", e.target.value)}
                    />
                </div>

            </div>
            <div className={styles.description}>
                <TextField
                    id="outlined-multiline-static"
                    label="Описание мероприятия"
                    multiline
                    rows={16}
                    sx={{
                        height: "100%",
                        width: "100%",
                    }}
                    value={eventData.content[0].payload.join(' ')}
                    onChange = {(e) => TextAreaChange("promotext", e.target.value)}
                />
            </div>
        </div>
    )
}


