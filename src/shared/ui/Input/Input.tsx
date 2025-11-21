import React, {type FC} from "react";
import cn from 'classnames'
import styles from './Input.css'
interface InputProps {
    className?: string
    placeholder?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: string
}
export const Input: FC<InputProps>=({ className, placeholder="Input Field",onChange,value})=>{
    return (
        <input className={cn(styles.input, className)} placeholder={`${placeholder}`} onChange={onChange} value={value}>
        </input>
    );
}
