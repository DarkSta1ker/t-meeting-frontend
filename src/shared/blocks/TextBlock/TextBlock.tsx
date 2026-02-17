import cn from 'classnames';
import React, {type FC, type PropsWithChildren} from 'react';
import styles from './TextBlock.module.css';

interface TextBlockProps extends PropsWithChildren {
    className?: string;
}

export const TextBlock: FC<TextBlockProps> = ({children, className}) => {
    return (
        <p className={cn(styles.textBlock, className)}>
            {children}
        </p>
    );
};
