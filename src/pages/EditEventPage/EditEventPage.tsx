import React, {type FC} from "react";
import {Header} from "../../widgets/Header/Header";
import {TextBlock} from "../../shared/blocks/TextBlock/TextBlock";
import {Input} from "../../shared/ui/Input/Input";
import {TextArea} from "../../shared/ui/TextArea/TextArea";
import {Button} from "../../shared/ui/Button/Button";
import { useNavigate } from 'react-router-dom';
import styles from './EditEventPage.css';
export const EditEventPage: FC = () => {
    const nav=useNavigate();
    return (
        <div className={styles.editEventPage}>
            <Header button1={()=>nav(-1)} button2={()=>nav('/personalAccount')}/>
            <div className={styles.board}>
                <TextBlock className={styles.editPageTextBlock}>Редактирование мероприятия</TextBlock>
                <div className={styles.editBlock}>
                    <div className={styles.nameAndDescription}>
                        <Input
                            className={styles.editPageInput}
                            placeholder="Название мероприятия"

                        />
                        <TextArea
                            className={styles.editPageTextArea}
                            placeholder="Описание мероприятия"
                        />
                    </div>
                    <div className={styles.timeAndPlace}>
                        <Input
                            className={styles.editPageInput}
                            placeholder="Время начала"
                        />
                        <Input
                            className={styles.editPageInput}
                            placeholder="Время конца"
                        />
                        <Input
                            className={styles.editPageInput}
                            placeholder="Место проведения"
                        />
                        <Input
                            className={styles.editPageInput}
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
                        className={styles.deleteButton}>
                        Удалить
                    </Button>
                    <Button
                        className={styles.saveButton}>
                        Сохранить
                    </Button>
                </div>
            </div>
        </div>
    )
}

