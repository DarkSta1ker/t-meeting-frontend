import React from "react";
import './styles/TextBlock.css';
export default function TextBlock({ children, className = "", textAlign = "center" }) {
    return (
        <p
            className={`TextBlock ${className}`}
            style={{
                textAlign: `${textAlign}`,
            }}
        >
            {children}
        </p>
    );
}
