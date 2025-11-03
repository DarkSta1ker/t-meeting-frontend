import React, {useState} from "react";
import Header from "../../widgets/header/header";
import Block from "../../shared/blocks/block/Block";
import TextBlock from "../../shared/blocks/text_block/TextBlock";
import Input from "../../shared/ui/input/Input";
import TextArea from "../../shared/ui/text_area/TextArea";
import Button from "../../shared/ui/button/Button";
import './styles/CreateEventPage.css';
export default function CreateEventPage() {
    return (
        <div className="CreateEventPage">
            <Header/>
            <Block
                width={"1232"}
                height={"880"}
                alignItems={"center"}
                flexDirection={"column"}>
                <TextBlock
                    textAlign={"left"}>
                    Создание мероприятия</TextBlock>
                <Block
                    width={"1232"}
                    height={"730"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    backgroundColor={"#E2E2E2"}
                    padding={"40px 60px"}>
                    <Block
                        width={"450"}
                        height={"649"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        flexDirection={"column"}>
                        <Input
                            className="Input"
                            type="text"
                            placeholder="Название мероприятия"
                            width={"450"}
                            height={"56"}
                            fontSize={"24"}
                        />
                        <TextArea
                            className="Input"
                            type="text"
                            placeholder="Описание мероприятия"
                            width={"450"}
                            height={"534"}
                            fontSize={"22"}
                        />
                    </Block>
                    <Block
                        width={"450"}
                        height={"649"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        flexDirection={"column"}>
                        <Input
                            className="Input"
                            type="text"
                            placeholder="Время начала"
                            width={"450"}
                            height={"56"}
                            fontSize={"24"}
                        />
                        <Input
                            className="Input"
                            type="text"
                            placeholder="Время конца"
                            width={"450"}
                            height={"56"}
                            fontSize={"24"}
                        />
                        <Input
                            className="Input"
                            type="text"
                            placeholder="Место проведения"
                            width={"450"}
                            height={"56"}
                            fontSize={"24"}
                        />
                        <Input
                            className="Input"
                            type="text"
                            placeholder="Дата"
                            width={"450"}
                            height={"56"}
                            fontSize={"24"}
                        />
                    </Block>
                </Block>
                <Block
                    width={"1232"}
                    height={"96"}
                    alignItems={"center"}
                    justifyContent={"right"}
                    gap={"30"}>
                    <Button
                        className="CancelButton">
                        Отмена
                    </Button>
                    <Button
                        className="SaveButton">
                        Сохранить
                    </Button>
                </Block>
            </Block>
        </div>
    );
}

