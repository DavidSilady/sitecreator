import gfm from "remark-gfm"
import ReactMarkdown from "react-markdown";
import {MDEditor} from "./MDEditor";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
// import Button from "@material-ui/core/Button";
// import MDEditor from "./MDEditor";
import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";
import {blue} from "@material-ui/core/colors";

export const useFormStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    textField: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    numTextField: {
        margin: theme.spacing(1),
        minWidth: 40,
        maxWidth: 70
    },
    keyboardDatePicker: {
        margin: theme.spacing(1),
        minWidth: 130,
        maxWidth: 150
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    imageInput: {
        display: "none",
    },
    imageButton: {
        color: blue[900],
        margin: 10
    },
}));


export const TextArea = ({className, children, isEditing}) => {
    if (isEditing) {
        return (
            <EditArea content={""} handleSubmit={() => {}}/>
        )
    } else {
        return (
            <MarkdownArea>
                {"# iS this working\n## **AND** this\n### and *thissss*?????"}
            </MarkdownArea>
        )
    }

}

export const MarkdownArea = ({className, children}) => {
    return (
        <ReactMarkdown plugins={gfm}>{children}</ReactMarkdown>
    )
}

export const EditArea = ({className, children, content, handlePropChange, propName}) => {
    return (
        <MDEditor content={content[propName]} handleSubmit={(value) => {handlePropChange(value, propName)}}/>
    );
}

export const JsonTextEditor = ({jsonData, handleChange}) => {
    const classes = useFormStyles();
    const [editingProp, setEditingProp] = useState("");
    const [accomState, setAccomState] = useState({});

    useEffect(() => {
        setAccomState(jsonData || {})
    }, [jsonData])

    function listProperties() {
        let propertyList = []
        for (let property in accomState) {
            propertyList.push(
                <MenuItem value={property}>{property}</MenuItem>
            )
        }
        return propertyList
    }

    function handleEditingPropChange(event) {
        setEditingProp(event.target.value)
    }

    return (
        <div className={"container material-shadow"}
             style={{paddingBottom: "10px", marginBottom: "20px", borderLeft: "3px solid #31b69c"}}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Edit Property</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={editingProp}
                    onChange={handleEditingPropChange}
                >
                    {listProperties()}
                </Select>
            </FormControl>
            <MDEditor
                content={accomState[editingProp]}
                handleSubmit={(value) => handleChange(editingProp, value)}
            />
        </div>
    )
}

