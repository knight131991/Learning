import React from "react"

export default function GreenCard ({content, width, height}) {
    return (
        <div style={{background: "green", width, height}}>
            {content}
        </div>
    )
}