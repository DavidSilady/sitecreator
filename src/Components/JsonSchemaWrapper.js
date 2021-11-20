import React, {useEffect, useState} from "react";
import Form from "@rjsf/material-ui";
import {getObjectFieldTemplate} from "./GridFormObjectTemplate";

export const JsonSchemaWrapper = ({updateContent, content, index, formSchema, children}) => {
    const [focusID, setFocusID] = useState("")

    const focus = () => {
        if (focusID) {
            document.getElementById(focusID).focus();
            console.log(focusID)
        }
    }

    // Keep focus after rerender
    focus()

    const onChange = ({formData}, e) => {
        if (content) {
            updateContent(formData)
        }
    }

    const onSubmit = ({formData}, e) => {
        console.log("Data submitted: ", formData);
    }

    const onFocus = (id) => {
        setFocusID(id)
    }

    const onBlur = (id) => {
        setFocusID("")
    }

    return (
        <div className={"container material-shadow"}
             style={{padding: "20px", margin: "20px", borderLeft: "3px solid #31b69c"}}>
            <Form schema={formSchema} onBlur={onBlur} onFocus={onFocus} onSubmit={onSubmit} onChange={onChange} formData={content}
                  idPrefix={index}
                  uiSchema={{
                      "ui:ObjectFieldTemplate": getObjectFieldTemplate(4),
                  }}
                  children={true}
                  key={"rjsf-main-" + index}
                  // liveValidate
            />
            {children}
        </div>
    )
}