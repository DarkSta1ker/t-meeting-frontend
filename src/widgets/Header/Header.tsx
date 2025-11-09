import React , {type FC} from "react";
import { ArrowLeft , User} from 'lucide-react';
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
                    children={<ArrowLeft size={36}/>}
                    className="returnButton"
                    onClick={button1}
                ></Button>
                <p className="headerText">T-meeting</p>
                <Button
                    children={<User size={36}/>}
                    className="avatarButton"
                    onClick={button2}
                ></Button>
            </div>
        </div>
    )
}
