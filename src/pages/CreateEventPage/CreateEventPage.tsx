import React, {type FC} from "react";
import {Header} from "../../widgets/Header/Header";
import {TextBlock} from "../../shared/blocks/TextBlock/TextBlock";
import {Input} from "../../shared/ui/Input/Input";
import {TextArea} from "../../shared/ui/TextArea/TextArea";
import {Button} from "../../shared/ui/Button/Button";
import { useNavigate } from 'react-router-dom';
import styles from './CreateEventPage.css';
export const CreateEventPage: FC = () => {
    const nav=useNavigate();
    return (
        <div className={styles.createEventPage}>
            <Header button1={()=>nav(-1)} button2={()=>nav('/personalAccount')}/>
            <div className={styles.board}>
                <TextBlock className={styles.createPageTextBlock}>Создание мероприятия</TextBlock>
                <div className={styles.editBlock}>
                    <div className={styles.nameAndDescription}>
                        <Input
                            className={styles.createPageInput}
                            placeholder="Название мероприятия"
                        />
                        <TextArea
                            className={styles.createPageTextArea}
                            placeholder="Описание мероприятия"
                        />
                    </div>
                    <div className={styles.timeAndPlace}>
                        <Input
                            className={styles.createPageInput}
                            placeholder="Время начала"
                        />
                        <Input
                            className={styles.createPageInput}
                            placeholder="Время конца"
                        />
                        <Input
                            className={styles.createPageInput}
                            placeholder="Место проведения"
                        />
                        <Input
                            className={styles.createPageInput}
                            placeholder="Дата"
                        />
                    </div>
                </div>
                <div className={styles.buttonsBlock}>
                    <Button
                        className={styles.cancelButton}
                        onClick={()=>nav('/eventsList')}>
                        Отмена
                    </Button>
                    <Button
                        className={styles.saveButton}>
                        Отправить
                    </Button>
                </div>
            </div>
        </div>
    )
}

