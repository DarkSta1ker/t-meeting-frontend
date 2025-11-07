import React , {type FC} from "react";
import {AvatarIcon, ArrowLeftIcon} from "@radix-ui/react-icons"
import {Button} from "../../shared/ui/Button/Button";
import './Header.css';
interface HeaderProps {
    button1?: ()=> void
    button2?: ()=> void
}
export const Header: FC<HeaderProps>=({button1, button2})=>{
    return(
        <div className="header">
            <div className="headerElements">
                <Button
                    children={<ArrowLeftIcon className="arrowLeftIcon" />}
                    className="returnButton"
                    onClick={button1}
                ></Button>
                <p className="headerText">T-meeting</p>
                <Button
                    children={<AvatarIcon className="avatarIcon"/>}
                    className="avatarButton"
                    onClick={button2}
                ></Button>
            </div>
        </div>
    )
}
