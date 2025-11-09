import React, {type FC} from "react";
import {Header} from "../../widgets/Header/Header";
import {TextBlock} from "../../shared/blocks/TextBlock/TextBlock";
import {Input} from "../../shared/ui/Input/Input";
import {TextArea} from "../../shared/ui/TextArea/TextArea";
import {Button} from "../../shared/ui/Button/Button";
import './EditEventPage.css';
export const EditEventPage: FC = () => {
    return (
        <div className="editEventPage">
            <Header/>
            <div className="board">
                <TextBlock className="editPageTextBlock">Редактирование мероприятия</TextBlock>
                <div className="editBlock">
                    <div className="nameAndDescription">
                        <Input
                            className="editPageInput"
                            placeholder="Название мероприятия"

                        />
                        <TextArea
                            className="editPageTextArea"
                            placeholder="Описание мероприятия"
                        />
                    </div>
                    <div className={"timeAndPlace"}>
                        <Input
                            className="editPageInput"
                            placeholder="Время начала"
                        />
                        <Input
                            className="editPageInput"
                            placeholder="Время конца"
                        />
                        <Input
                            className="editPageInput"
                            placeholder="Место проведения"
                        />
                        <Input
                            className="editPageInput"
                            placeholder="Дата"
                        />
                    </div>
                </div>
                <div className="buttonsBlock">
                    <Button
                        className="cancelButton">
                        Отмена
                    </Button>
                    <Button
                        className="deleteButton">
                        Удалить
                    </Button>
                    <Button
                        className="saveButton">
                        Сохранить
                    </Button>
                </div>
            </div>
        </div>
    )
}

