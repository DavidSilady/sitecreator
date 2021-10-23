import React from "react";

export const ColorDisplay = ({color="green", title=""}) => {
    return (
        <div style={{display: "flex", alignItems: "center"}}>
            <div style={{width: "30px", height: "15px"}} className={`bg-${color}`}>
            </div>
            <div style={{padding: "0 10px 0 10px"}}>
                {title}
            </div>
        </div>

    )
}

export const colorPickerFormSchema = (title="Color") => {
    return {
        type: "string",
        enum: ["green", "orange", "blue", "darkblue", "white", "black"],
        enumNames: [
            <ColorDisplay color={"green"} title={"Green"}/>,
            <ColorDisplay color={"orange"} title={"Orange"}/>,
            <ColorDisplay color={"blue"} title={"Blue"}/>,
            <ColorDisplay color={"darkblue"} title={"Dark Blue"}/>,
            <ColorDisplay color={"white"} title={"White"}/>,
            <ColorDisplay color={"black"} title={"Black"}/>,
        ],
        title: title,
        default: "green"
    }
}