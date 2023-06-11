import React from "react"
import { GoGear } from "react-icons/go"

function LoadingGear({ loading }) {

    const gearStyle = {
        transform: loading ? "rotate(360deg)" : "rotate(0deg)",
        transition: "transform 1s linear",
    }

    return (
        <div>
            <GoGear size={20} style={ gearStyle } />
        </div>
    )
}

export default LoadingGear