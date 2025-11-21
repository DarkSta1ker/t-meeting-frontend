import React, { type FC, type PropsWithChildren} from 'react'
import cn from 'classnames'
import styles from './Button.css'
type ButtonType = 'button' | 'submit' | 'reset';
interface ButtonProps extends PropsWithChildren {
    type ?: ButtonType
    className?: string
    onClick?: () => void
    disabled?: boolean
}

export const Button: FC<ButtonProps> = ({type, onClick, className, children, disabled}) => {
    return (
        <button type={type} className={cn(styles.button, className)} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}
