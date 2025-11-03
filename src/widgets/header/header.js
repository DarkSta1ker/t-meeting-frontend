import React from "react";
import { Avatar } from "radix-ui";
import {AvatarIcon, ArrowLeftIcon} from "@radix-ui/react-icons"
import Button from "../../shared/ui/button/Button";
import './styles/header.css';
export default function Header({button1,button2}) {
    return (
        <div className="Header">
            <div className="HeaderElements">
                <Button
                    className="ReturnButton"
                    onClick={button1}
                >
                    <ArrowLeftIcon className="ArrowLeftIcon" />
                </Button>
                <p className="HeaderText">T-meeting</p>
                <Button
                    className="AvatarButton"
                    onClick={button2}
                >
                    <AvatarIcon className="AvatarIcon"/>
                </Button>
            </div>
        </div>
    );
}
