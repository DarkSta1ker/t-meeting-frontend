import React from "react";
import './styles/Button.css';
export default function Button({ children, onClick, className = "", ...props }) {
    return (
        <button
            className={`Button ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
