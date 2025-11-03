import React from "react";
export default function Block({ children, className = "", width, height,justifyContent="center", alignItems="center" ,flexDirection="row" ,backgroundColor="",padding="",gap="" }) {
    return (
        <div
            className={`Block ${className}`}
            style={{
                width:`${width}px`,
                height:`${height}px`,
                justifyContent:`${justifyContent}`,
                alignItems:`${alignItems}`,
                display:"flex",
                boxSizing: "border-box",
                flexDirection: `${flexDirection}`,
                margin: "0 auto",
                backgroundColor:`${backgroundColor}`,
                padding:`${padding}`,
                gap:`${gap}px`,
                }}
        >{children}
        </div>
    );
}
