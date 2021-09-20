import {GoldenRow, GoldenRowEditor, GoldenRowWrapper} from "./GoldenRow";
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

const EditableComponentBuilder = ({jsonComponent}) => {
    const [editableComponent, setEditableComponent] = useState({})

    useEffect(() => {
        setEditableComponent(jsonComponent)
    })

    const Component = components[jsonComponent.name]

    function updateContent(propName, value) {
        jsonComponent.content[propName] = value;
        setEditableComponent({
            name: editableComponent.name,
            content: {
                ...editableComponent.content,
                propName: value
            }
        })
    }


    return (
        <div>
            <Component.Editor updateContent={updateContent}/>
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
            {jsonComponents.map(component => (
                <EditableComponentBuilder jsonComponent={component}/>
            ))}
        </div>
    )
}