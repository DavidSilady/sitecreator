import {GoldenRow, GoldenRowEditor, GoldenRowWrapper} from "./BuildComponents/GoldenRow";
import {map} from "react-bootstrap/ElementChildren";
import {BsLayoutWtf} from "react-icons/bs";
import {RiLayoutRightFill} from "react-icons/ri";
import {useEffect, useState} from "react";
import {MDEditor} from "./MDEditor";
import {JsonTextEditor} from "./TextFieldEditor";

class CustomComponent {
    constructor(jsx, editor, name="", icon=<BsLayoutWtf/>) {
        this.name = name
        this.icon = icon
        this.Jsx = jsx
        this.Editor = editor
        this.content = {}
    }
}

const components = {
    "GoldenRow": new CustomComponent(GoldenRowWrapper, GoldenRowEditor, "GoldenRow", <RiLayoutRightFill/>)
}

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
            {jsonComponents.map(component => (
                <ComponentBuilder jsonComponent={component}/>
            ))}
        </div>
    )
}

const EditableComponentBuilder = ({jsonComponent, index}) => {
    const [editableComponent, setEditableComponent] = useState({})


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
        jsonComponent.content = data
        setEditableComponent({
            ...editableComponent,
            content: data
        })
        // console.log(editableComponent.content)
    }

    return (
        <div>
            <Component.Editor updateContent={updateContent} content={editableComponent.content} index={index}/>
            <ComponentBuilder jsonComponent={editableComponent}/>
        </div>
    )
}

export const EditableSiteBuilder = ({initialComponents}) => {
    const [jsonComponents, setJsonComponents] = useState([])

    useEffect(() => {
        setJsonComponents(initialComponents)
    }, [initialComponents])

    function moveComponentUp(component) {

    }

    function moveComponentDown(component) {

    }

    function deleteComponent(component) {

    }

    function createComponent() {

    }

    function editComponent(component) {

    }

    return (
        <div>
            {jsonComponents.map((component, index) => {

                return <EditableComponentBuilder jsonComponent={component} index={index}/>
            })}
        </div>
    )
}