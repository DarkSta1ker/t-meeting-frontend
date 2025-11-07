import React, {type FC} from "react";
import cn from 'classnames'
import styles from './Input.css'
interface InputProps {
    className?: string
    placeholder?: string
}
export const Input: FC<InputProps>=({ className, placeholder="Input Field"})=>{
    return (
        <input className={cn(styles.input, className)} placeholder={`${placeholder}`}>
        </input>
    );
}
