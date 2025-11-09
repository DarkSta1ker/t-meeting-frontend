import React, {type FC} from "react";
import {Header} from "../../widgets/Header/Header";
import {useNavigate} from "react-router-dom";

export const PersonalAccount: FC = () => {
    const nav=useNavigate();
    return (
        <div className="personalAccount">
            <Header button1={()=>nav(-1)}/>

        </div>
    )
}