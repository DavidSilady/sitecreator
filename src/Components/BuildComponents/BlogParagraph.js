import {RandomRectangles} from "./StylingAddons";
import {Col, Row} from "react-bootstrap";
import {Markdown} from "../Markdown";
import {useWindowSize} from "../../screen";
import {removeFirstOccurrence} from "../../helpers";
import {JsonSchemaWrapper} from "../JsonSchemaWrapper";
import {colorPickerFormSchema} from "../ColorDisplay";
import {MDEditor} from "../MDEditor";
import React from "react";


export function BlogParagraphEditor({updateContent, updateContentProp, content, index}) {
    const formSchema = {
        title: "Blog Paragraph",
        type: "object",
        properties: {
            backgroundColor: colorPickerFormSchema("Background Color"),
            displayBorders: {type: "boolean", title: "Display Borders?"},
            // borderDensity: {type: "number", title: "Border Density"},
        }
    }

    if (content && content.displayBorders) {
        formSchema.properties.borderDensity = {type: "number", title: "Border Density", minimum: 2}
    }

    return (
        <JsonSchemaWrapper formSchema={formSchema} index={index} content={content} updateContent={updateContent}>
            <MDEditor content={content ? content.markdown : null} handleSubmit={(value) => updateContentProp("markdown", value)} key={`${index}_MDEditor`} keyValue={`${index}_MDEditorArea`}/>
        </JsonSchemaWrapper>
    )
}

export function BlogParagraphWrapper({content}) {
    return (
        <BlogParagraph markdown={content.markdown} backgroundColor={content.backgroundColor} borderDensity={content.borderDensity} displayBorders={content.displayBorders}/>
    )
}

export function BlogParagraph({markdown, backgroundColor, displayBorders, borderDensity=5}) {
    const {width, height} = useWindowSize()
    const borderColors = filterBorderColors(backgroundColor)

    if (borderDensity < 2) {
        borderDensity = 2
    }

    const styling = {
        paddingTop: "80px",
        paddingLeft: "17%",
        paddingRight: "12%",
        paddingBottom: "60px",
        fontSize: "1.3rem",
        // fontWeight: "300",
        fontFamily: "Segoe UI Light"
    }
    if (width < 992) {
        styling.paddingLeft = "7%"
        styling.paddingRight = "7%"
        styling.fontSize = "1.15rem"
    }
    return (
        <Row className={`bg-${backgroundColor} no-padding`}>
            <Col xs={0} md={1} align={"left"} style={{paddingLeft: "0"}}>
                {displayBorders ?
                    <RandomRectangles colors={borderColors} number={borderDensity} range={10}/>
                    :
                    null
                }
            </Col>

            <Col xs={12} md={10}>
                <div style={styling}>
                    <Markdown>
                        {markdown}
                    </Markdown>
                </div>
            </Col>
            <Col xs={0} md={1} align={"right"} style={{paddingRight: "0"}}>
                {displayBorders ?
                    <RandomRectangles colors={borderColors} number={borderDensity} range={10}/>
                    :
                    null
                }
            </Col>
        </Row>
    )
}

function filterBorderColors(backgroundColor) {
    const colors = ["green", "orange", "blue", "darkblue", "white"]
    return removeFirstOccurrence(backgroundColor, colors)
}