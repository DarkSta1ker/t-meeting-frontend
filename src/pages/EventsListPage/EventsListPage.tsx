import React, {type FC} from "react";
import {Header} from "../../widgets/Header/Header";
import {TextBlock} from "../../shared/blocks/TextBlock/TextBlock";
import {Button} from "../../shared/ui/Button/Button";
import { useNavigate } from 'react-router-dom';
import {EllipsisVertical, Calendar, MapPinIcon, CirclePlus} from 'lucide-react';
import { DropdownMenu } from "radix-ui";
import './EventsListPage.css';
export const EventsListPage: FC = () => {
    const nav=useNavigate();
    return (
        <div className="eventsListPage">
            <Header  button1={()=>nav(-1)} button2={()=>nav('/personalAccount')}/>
            <div className="board">
                <TextBlock className="eventsListTextBlock">Список мероприятий</TextBlock>
                <div className="eventsListBlock">
                    <div className="eventBlock">
                        <div className="nameAndDescriptionListPage">
                            <TextBlock className="eventName">Название мероприятия</TextBlock>
                            <TextBlock className="eventDescription">Описание мероприятия.
                                проверка на то как будет переноситься текст
                                проверка на то как будет переноситься текст
                                проверка на то как будет переноситься текст
                                проверка на то как будет переноситься текст
                                проверка на то как будет переноситься текст
                                проверка на то как будет переноситься текст
                                проверка на то как будет переноситься текст
                                проверка на то как бюудет переноситься текст</TextBlock>
                        </div>
                        <div className="dataAndPlace">
                            <div className="dataBlock">
                                <TextBlock className="data">Дата</TextBlock>
                                <Calendar/>
                            </div>
                            <div className="placeBlock">
                                <TextBlock className="place">Место проведения</TextBlock>
                                <MapPinIcon/>
                            </div>
                        </div>
                        <div className="dropDownMenu">
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger asChild>
                                    <button className="dropDownMenuButton" aria-label="Actions">
                                        <EllipsisVertical/>
                                    </button>
                                </DropdownMenu.Trigger>

                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content className="dropdownMenuContent" side="left" sideOffset={5}>
                                        <DropdownMenu.Item className="dropdownMenuItem" onSelect={()=>nav('/editEvent')}>
                                            Редактировать
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item className="dropdownMenuItem">
                                            Отметить активным
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item className="dropdownMenuItem">
                                            Удалить
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Arrow className="dropdownMenuArrow" />

                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Root>
                        </div>
                    </div>
                    <Button className="addEventButton" onClick={()=>nav('/createEvent')}>
                        <CirclePlus size={30}/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

