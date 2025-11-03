import React from "react";
import './styles/TextArea.css';
export default function TextArea({ className = "", placeholder="TextArea Field", width="200", height="35", fontSize="15"}) {
    return (
        <textarea
            className={`TextArea ${className}`}
            placeholder={`${placeholder}`}
            style={{
                width:`${width}px`,
                height:`${height}px`,
                fontSize:`${fontSize}px`,
            }}>
        </textarea>
    );
}
