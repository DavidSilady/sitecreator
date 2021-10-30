import {RandomRectangles} from "./StylingAddons";
import {Col, Row} from "react-bootstrap";
import {Markdown} from "../Markdown";
import {useWindowSize} from "../../screen";
import {removeFirstOccurrence} from "../../helpers";
import {JsonSchemaWrapper} from "../JsonSchemaWrapper";
import {colorPickerFormSchema} from "../ColorDisplay";
import {MDEditor} from "../MDEditor";
import React from "react";

const formSchema = {
    title: "Paragraph Bordered",
    type: "object",
    properties: {
        backgroundColor: colorPickerFormSchema("Background Color")
    }
}

export function ParagraphBorderedEditor({updateContent, updateContentProp, content, index}) {
    return (
        <JsonSchemaWrapper formSchema={formSchema} index={index} content={content} updateContent={updateContent}>
            <MDEditor content={content ? content.markdown : null} handleSubmit={(value) => updateContentProp("markdown", value)} key={`${index}_MDEditor`} keyValue={`${index}_MDEditorArea`}/>
        </JsonSchemaWrapper>
    )
}

export function ParagraphBorderedWrapper({content}) {
    return (
        <ParagraphBordered markdown={content.markdown} backgroundColor={content.backgroundColor}/>
    )
}

export function ParagraphBordered({markdown, backgroundColor}) {
    const {width, height} = useWindowSize()
    const borderColors = filterBorderColors(backgroundColor)

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
        <Row className={`bg-${backgroundColor}`}>
            <Col xs={0} md={2} align={"left"}>
                {/*<RandomRectangles colors={borderColors} number={5} range={5}/>*/}
            </Col>
            <Col xs={12} md={8}>
                <div style={styling}>
                    <Markdown>
                        {markdown}
                    </Markdown>
                </div>
            </Col>
            <Col xs={0} md={2} align={"right"}>
                {/*<RandomRectangles colors={borderColors} number={5} range={10}/>*/}
            </Col>
        </Row>
    )
}

function filterBorderColors(backgroundColor) {
    const colors = ["green", "orange", "blue", "darkblue", "white"]
    return removeFirstOccurrence(backgroundColor, colors)
}