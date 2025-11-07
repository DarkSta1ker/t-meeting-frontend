import React,{type FC}  from "react";
import cn from 'classnames'
import styles from './TextArea.css';
interface TextAreaProps {
    className?: string
    placeholder?: string
}

export const TextArea: FC<TextAreaProps>=({ className, placeholder="TextArea Field"})=>{
    return (
        <textarea className={cn(styles.textArea, className)} placeholder={placeholder}>
        </textarea>
    );
}