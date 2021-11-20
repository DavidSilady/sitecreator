import {GoldenRow, GoldenRowEditor, GoldenRowWrapper} from "./BuildComponents/GoldenRow";
import {BsLayoutWtf} from "react-icons/bs";
import {RiLayoutRightFill} from "react-icons/ri";
import {useEffect, useState} from "react";
import {MDEditor} from "./MDEditor";
import {JsonTextEditor} from "./TextFieldEditor";
import {components} from "./BuildComponentMap";
import {Button} from "@material-ui/core";
import {AiFillDelete, AiFillDownCircle, AiFillEdit, AiFillUpCircle} from "react-icons/ai";

export const ComponentBuilder = ({jsonComponent}) => {
    const Component = components[jsonComponent.name]
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

    const Component = components[jsonComponent.name]

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


    return (
        <div>
            {isEditing ?
                <Component.Editor updateContent={updateContent} updateContentProp={updateContentProp}
                                  content={editableComponent.content} index={index}/>
                :
                null
            }
            <div style={{display: "flex", justifyContent: "right", width: "100%", padding: "0 20px"}}>
                <Button color={"primary"} variant={isEditing ? "outlined" : "contained"} onClick={() => {setIsEditing(!isEditing)}}><h5><AiFillEdit/></h5></Button>
                <Button color={"primary"} variant={"contained"} onClick={moveComponentUp}><h5><AiFillUpCircle/></h5></Button>
                <Button color={"primary"} variant={"contained"} onClick={moveComponentDown}><h5><AiFillDownCircle/></h5></Button>
                <Button style={{marginLeft: "10px"}} color={"secondary"} variant={"contained"} onClick={deleteComponent}><h5><AiFillDelete/></h5></Button>
            </div>
            <ComponentBuilder jsonComponent={editableComponent}/>
        </div>
    )
}

export const EditableSiteBuilder = ({initialComponents}) => {
    const [jsonComponents, setJsonComponents] = useState([])

    useEffect(() => {
        setJsonComponents(initialComponents)
    }, [initialComponents])

    function moveComponentUp(index) {
        const newArray = moveElement(jsonComponents, index, index - 1)
        initialComponents = [... newArray]
        setJsonComponents([... newArray])
    }

    function moveComponentDown(index) {
        const newArray = moveElement(jsonComponents, index, index + 1)
        initialComponents = [... newArray]
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

    function createComponent() {

    }

    function editComponent(component) {

    }

    return (
        <div>
            {jsonComponents.map((component, index) => {
                return (
                    <div style={{paddingTop: "20px"}}>
                        <EditableComponentBuilder
                            jsonComponent={component}
                            index={index}
                            key={index}
                            moveComponentUp={() => moveComponentUp(index)}
                            moveComponentDown={() => moveComponentDown(index)}
                            deleteComponent={() => deleteComponent(index)}
                        />
                    </div>
                )
            })}
        </div>
    )
}

function moveElement(array, initialIndex, finalIndex) {
    array.splice(finalIndex,0,array.splice(initialIndex,1)[0])
    console.log(array)
    return array;
}