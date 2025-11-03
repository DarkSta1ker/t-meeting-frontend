import React from "react";
import './styles/Input.css';
export default function Input({ className = "", placeholder="Input Field", width="200", height="35", fontSize="15"}) {
    return (
        <input
            className={`Input ${className}`}
            placeholder={`${placeholder}`}
            style={{
                width:`${width}px`,
                height:`${height}px`,
                fontSize:`${fontSize}px`,
            }}>
        </input>
    );
}
