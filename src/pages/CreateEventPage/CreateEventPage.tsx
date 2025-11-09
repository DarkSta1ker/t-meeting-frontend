import React, {type FC} from "react";
import {Header} from "../../widgets/Header/Header";
import {TextBlock} from "../../shared/blocks/TextBlock/TextBlock";
import {Input} from "../../shared/ui/Input/Input";
import {TextArea} from "../../shared/ui/TextArea/TextArea";
import {Button} from "../../shared/ui/Button/Button";
import { useNavigate } from 'react-router-dom';
import './CreateEventPage.css';
export const CreateEventPage: FC = () => {
    const nav=useNavigate();
    return (
        <div className="createEventPage">
            <Header button1={()=>nav(-1)} button2={()=>nav('/personalAccount')}/>
            <div className="board">
                <TextBlock className="createPageTextBlock">Создание мероприятия</TextBlock>
                <div className={"editBlock"}>
                    <div className={"nameAndDescription"}>
                        <Input
                            className="createPageInput"
                            placeholder="Название мероприятия"

                        />
                        <TextArea
                            className="createPageTextArea"
                            placeholder="Описание мероприятия"
                        />
                    </div>
                    <div className={"timeAndPlace"}>
                        <Input
                            className="createPageInput"
                            placeholder="Время начала"
                        />
                        <Input
                            className="createPageInput"
                            placeholder="Время конца"
                        />
                        <Input
                            className="createPageInput"
                            placeholder="Место проведения"
                        />
                        <Input
                            className="createPageInput"
                            placeholder="Дата"
                        />
                    </div>
                </div>
                <div className="buttonsBlock">
                    <Button
                        className="cancelButton"
                        onClick={()=>nav('/eventsList')}>
                        Отмена
                    </Button>
                    <Button
                        className="saveButton">
                        Отправить
                    </Button>
                </div>
            </div>
        </div>
    )
}

