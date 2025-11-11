import React, {type FC} from "react";
import {Header} from "../../widgets/Header/Header";
import {TextBlock} from "../../shared/blocks/TextBlock/TextBlock";
import {Button} from "../../shared/ui/Button/Button";
import { useNavigate } from 'react-router-dom';
import {EllipsisVertical, Calendar, MapPinIcon, CirclePlus} from 'lucide-react';
import { DropdownMenu } from "radix-ui";
import styles from './EventsListPage.css';
export const EventsListPage: FC = () => {
    const nav=useNavigate();
    return (
        <div className={styles.eventsListPage}>
            <Header  button1={()=>nav(-1)} button2={()=>nav('/personalAccount')}/>
            <div className={styles.board}>
                <TextBlock className={styles.eventsListTextBlock}>Список мероприятий</TextBlock>
                <div className={styles.eventsListBlock}>
                    <div className={styles.eventBlock}>
                        <div className={styles.nameAndDescriptionListPage}>
                            <TextBlock className={styles.eventName}>Название мероприятия</TextBlock>
                            <TextBlock className={styles.eventDescription}>Описание мероприятия.
                                проверка на то как будет переноситься текст
                                проверка на то как будет переноситься текст
                                проверка на то как будет переноситься текст
                                проверка на то как будет переноситься текст
                                проверка на то как будет переноситься текст
                                проверка на то как будет переноситься текст
                                проверка на то как будет переноситься текст
                                проверка на то как бюудет переноситься текст</TextBlock>
                        </div>
                        <div className={styles.dataAndPlace}>
                            <div className={styles.dataBlock}>
                                <TextBlock className={styles.data}>Дата</TextBlock>
                                <Calendar/>
                            </div>
                            <div className={styles.placeBlock}>
                                <TextBlock className={styles.place}>Место проведения</TextBlock>
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
                                        <DropdownMenu.Item className={styles.dropdownMenuItem} onSelect={()=>nav('/editEvent')}>
                                            Редактировать
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item className={styles.dropdownMenuItem}>
                                            Отметить активным
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item className={styles.dropdownMenuItem}>
                                            Удалить
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Arrow className={styles.dropdownMenuArrow} />

                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Root>
                        </div>
                    </div>
                    <Button className={styles.addEventButton} onClick={()=>nav('/createEvent')}>
                        <CirclePlus size={30}/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

