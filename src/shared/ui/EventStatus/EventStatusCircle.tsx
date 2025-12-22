import React, {FC} from "react";
import {Circle} from "lucide-react";

interface EventStatusProps {
    status: string;
}

export const EventStatusCircle: FC<EventStatusProps> = ({status}) => {
    const getColor = () => {
        switch (status) {
            case "published":
                return "#34c658"
            case "draft":
                return "#fecd00";
            case "archived":
                return "#00c5ff";
            default:
                return "#ec231e"
        }
    }
    const color = getColor();
    return (
        <Circle size={8} fill={color} color={color}/>
    )
}