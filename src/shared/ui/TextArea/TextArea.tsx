import cn from "classnames";
import React, {type FC} from "react";
import styles from "./TextArea.css";

interface TextAreaProps {
    className?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string;
}

export const TextArea: FC<TextAreaProps> = ({className, placeholder = "TextArea Field", onChange, value}) => {
    return (
        <textarea className={cn(styles.textArea, className)} placeholder={placeholder} onChange={onChange}
                  value={value}>
        </textarea>
    );
};
