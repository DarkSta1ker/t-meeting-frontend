import React, {type FC, type PropsWithChildren} from "react";
import cn from 'classnames'
import styles from './TextBlock.css';
interface TextBlockProps extends PropsWithChildren {
    className?: string
}
export const TextBlock: FC<TextBlockProps>=({children, className})=>{
    return (
        <p className={cn(styles.textBlock, className)}>
            {children}
        </p>
    )
}