import {GoldenRow, GoldenRowEditor, GoldenRowWrapper} from "./BuildComponents/GoldenRow";
import {BsLayoutWtf} from "react-icons/bs";
import {RiLayoutRightFill} from "react-icons/ri";
import React, {useEffect, useState} from "react";
import {MDEditor} from "./MDEditor";
import {JsonTextEditor} from "./TextFieldEditor";
import {componentMap} from "./BuildComponentMap";
import {Box, Button, IconButton, Modal} from "@material-ui/core";
import {AiFillDelete, AiFillEdit, AiFillSave} from "react-icons/ai";
import {FaArrowAltCircleDown, FaArrowAltCircleUp, FaPlusCircle} from "react-icons/fa";
import Grid from "@material-ui/core/Grid";
import {JsonSchemaWrapper} from "./JsonSchemaWrapper";
import {MdContentCopy} from "react-icons/all";

export const ComponentBuilder = ({jsonComponent}) => {
    const Component = componentMap[jsonComponent.name]
    if (Component) {
        return (
            <Component.Jsx content={jsonComponent.content}/>
        )
    } else {
        //TODO: PROPER LOADING
        return (
            <div>LOADING</div>
        )
    }
}

export const SiteBuilder = ({jsonComponents}) => {
    return (
        <div>
            {jsonComponents.map((component, index) => (
                <ComponentBuilder jsonComponent={component} key={index}/>
            ))}
        </div>
    )
}

const EditableComponentBuilder = ({jsonComponent, index, moveComponentUp, moveComponentDown, deleteComponent}) => {
    const [editableComponent, setEditableComponent] = useState({})
    const [isEditing, setIsEditing] = useState(false)



    useEffect(() => {
        setEditableComponent(jsonComponent)
    })

    const Component = componentMap[jsonComponent.name]

    function updateContentProp(propName, value) {
        jsonComponent.content[propName] = value;
        setEditableComponent({
            name: editableComponent.name,
            content: {
                ...editableComponent.content,
                propName: value
            }
        })
    }

    function updateContent(data) {
        const newContent = Object.assign(editableComponent.content, data)
        jsonComponent.content = newContent

        setEditableComponent({
            ...editableComponent,
            content: newContent
        })
        // console.log(editableComponent.content)
    }

    const EditButtons = () => (
        <>
            <div>
                <IconButton color={"primary"} onClick={() => {setIsEditing(!isEditing)}}><AiFillEdit/></IconButton>
            </div>
            <div>
                <IconButton color={"primary"} onClick={moveComponentUp}><FaArrowAltCircleUp/></IconButton>
            </div>
            <div>
                <IconButton color={"primary"} onClick={moveComponentDown}><FaArrowAltCircleDown/></IconButton>
            </div>
            <div>
                <IconButton color={"secondary"} onClick={deleteComponent}><AiFillDelete/></IconButton>
            </div>
        </>
    )

    return (
        <div>
            {isEditing ?
                <div style={{display: "flex", justifyContent: "right", width: "100%", padding: "0 20px"}}>
                    <Component.Editor
                        updateContent={updateContent}
                        updateContentProp={updateContentProp}
                        content={editableComponent.content}
                        index={index}
                    />
                    <div style={{display: "block"}}>
                        <EditButtons/>
                    </div>
                </div>
                :
                <div style={{display: "flex", justifyContent: "right", width: "100%", padding: "0 20px"}}>
                    <EditButtons/>
                </div>
            }
            <ComponentBuilder jsonComponent={editableComponent}/>
        </div>
    )
}

export const EditableSiteBuilder = ({initialComponents, initialConfig}) => {
    const [jsonComponents, setJsonComponents] = useState([])
    const [config, setConfig] = useState({})
    const [newComponentModalOpen, setNewComponentModalOpen] = useState(false)
    const [newComponentIndex, setNewComponentIndex] = useState(0)
    const [copySuccess, setCopySuccess] = useState(false)

    useEffect(() => {
        setJsonComponents(initialComponents)
        setConfig(initialConfig)
    }, [initialComponents, initialConfig])

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    function moveComponentUp(index) {
        const newArray = moveElement(jsonComponents, index, index - 1)
        setJsonComponents([... newArray])
    }

    function moveComponentDown(index) {
        const newArray = moveElement(jsonComponents, index, index + 1)
        setJsonComponents([... newArray])
    }

    function deleteComponent(index) {

        if (window.confirm("Are you sure you want to delete an element?")) {
            if (index > -1) {
                jsonComponents.splice(index, 1);
                setJsonComponents([... jsonComponents])
            }
        }
    }

    function createComponent(componentKey) {
        const newComponent = {
            "name": componentKey,
            "id": generateID(),
            "content": componentMap[componentKey].defaultContent,
        }
        const newArray = addElementToIndex(jsonComponents, newComponentIndex, newComponent)
        setJsonComponents([... newArray])
        closeAddComponentModal()
    }

    function openAddComponentModal(index) {
        setNewComponentModalOpen(true)
        setNewComponentIndex(index)
    }

    function closeAddComponentModal() {
        setNewComponentModalOpen(false)
    }

    function updateConfig(data) {
        const newConfig = Object.assign(config, data)
        // setConfig({... newConfig})
        setConfig({... newConfig})
    }

    function saveSite() {
        console.log(config)
    }
    function deleteSite() {}

    return (
        <div>
            <div className={"container material-shadow"} style={{padding: "20px", margin: "20px", borderLeft: "3px solid #31b69c"}}>
                <div style={{display: "flex"}}>
                    <JsonSchemaWrapper key={"json-schema-wrapper-config"} updateContent={updateConfig} content={config} index={"site-config-schema"} formSchema={siteConfigFormSchema}>
                        <Button startIcon={<MdContentCopy/>}
                                onClick={() => {
                                    navigator.clipboard.writeText(`https://ckvida.sk/w/${config.endpoint}`).then(
                                        () => {
                                            setCopySuccess(true)
                                        }
                                    )
                                }}
                        >
                            https://ckvida.sk/w/{config.endpoint}
                        </Button>
                        <div
                            className={`alert alert-success ${copySuccess ? 'alert-shown' : 'alert-hidden'}`}
                            onTransitionEnd={() => setCopySuccess(false)}
                        >
                            URL <strong>copied</strong>!
                        </div>
                    </JsonSchemaWrapper>
                    <div style={{display: "flex", marginLeft: "auto"}}>
                        <div style={{alignSelf: "flex-end"}}>
                            <IconButton color={"primary"} onClick={saveSite}><AiFillSave/></IconButton>
                        </div>
                        <div style={{alignSelf: "flex-end"}}>
                            <IconButton color={"secondary"} onClick={deleteSite}><AiFillDelete/></IconButton>
                        </div>
                    </div>
                </div>

            </div>
            {jsonComponents.map((component, index) => {
                return (
                    <div style={{paddingTop: "20px"}}>
                        <div style={{textAlign: "center"}}>
                            <IconButton color={"primary"} aria-label={"Add Component"} onClick={() => openAddComponentModal(index)}><FaPlusCircle/></IconButton>
                        </div>
                        <EditableComponentBuilder
                            jsonComponent={component}
                            index={index}
                            key={component.name + component.id + index}
                            moveComponentUp={() => moveComponentUp(index)}
                            moveComponentDown={() => moveComponentDown(index)}
                            deleteComponent={() => deleteComponent(index)}
                        />
                    </div>
                )
            })}
            <div style={{textAlign: "center", padding: "40px 0"}}>
                <IconButton color={"primary"} aria-label={"Add Component"} onClick={() => openAddComponentModal(jsonComponents.length)}><FaPlusCircle/></IconButton>
            </div>
            <Modal open={newComponentModalOpen} onClose={closeAddComponentModal}>
                <Box sx={modalStyle}>
                    <Grid container spacing={2}>
                        {
                            Object.keys(componentMap).map(key =>
                                (
                                    <Grid item xs={4}>
                                        <IconButton
                                            onClick={() => createComponent(key)}
                                        >
                                            <div style={{textAlign: "center"}}>
                                                {componentMap[key].icon}
                                                {componentMap[key].name}
                                            </div>
                                        </IconButton>
                                    </Grid>
                                )
                            )
                        }
                    </Grid>
                </Box>
            </Modal>
        </div>
    )
}

const siteConfigFormSchema = {
    title: "Site Configuration",
    type: "object",
    properties: {
        endpoint: {type: "string", title: "Endpoint", description: "URL Path"},
        display: {type: "boolean", title: "Display site?"},
    }
}

function generateID() {
    const uuid = require("uuid");
    return uuid.v4();
}

function addElementToIndex(array, index, element) {
    array.splice(index, 0, element)
    return array
}

function moveElement(array, initialIndex, finalIndex) {
    array.splice(finalIndex,0,array.splice(initialIndex,1)[0])
    return array
}