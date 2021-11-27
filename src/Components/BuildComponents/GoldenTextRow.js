import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import Form from "@rjsf/material-ui";
import {ColorDisplay, colorPickerFormSchema} from "../ColorDisplay";
import {Button} from "@material-ui/core";
import {MarkdownArea} from "../TextFieldEditor";
import {Markdown} from "../Markdown";
import {getObjectFieldTemplate} from "../GridFormObjectTemplate";
import {JsonSchemaWrapper} from "../JsonSchemaWrapper";
import {MDEditor} from "../MDEditor";
import {useMobileCheck, useWindowSize} from "../../screen";


const formSchema = {
    title: "Golden Text Row",
    type: "object",
    properties: {
        sideColor: colorPickerFormSchema("Side Background"),
        sideTextColor: colorPickerFormSchema("Side Text"),
        justify: {type: "string", enum: ["text-left", "text-right"], enumNames: ["Left", "Right"], title: "Justify"},
        mainColor: colorPickerFormSchema("Main Background"),
        mainTextColor: colorPickerFormSchema("Main Text"),
        markdownMain: {type: "null"},
        markdownSide: {type: "null"},
    }
}

export const GoldenTextRowEditor = ({updateContent, updateContentProp, content, index}) => {
    return (
        <JsonSchemaWrapper formSchema={formSchema} index={index} content={content} updateContent={updateContent}>
            <h5>Main Markdown</h5>
            <MDEditor content={content ? content.markdownMain : null} handleSubmit={(value) => updateContentProp("markdownMain", value)} key={`${index}_MDEditor`} keyValue={`${index}_MDEditorArea`}/>
            <h5>Side Markdown</h5>
            <MDEditor content={content ? content.markdownSide : null} handleSubmit={(value) => updateContentProp("markdownSide", value)} key={`${index}_MDEditor`} keyValue={`${index}_MDEditorArea`}/>
        </JsonSchemaWrapper>
    )
}

export const GoldenTextRowWrapper = ({content}) => {
    return (
        <GoldenTextRow
            colors={{
                side: content.sideColor,
                sideText: content.sideTextColor,
                main: content.mainColor,
                mainText: content.mainTextColor,
            }}
            justify={content.justify}
            id={content.id}
            markdownMain={content.markdownMain}
            markdownSide={content.markdownSide}
        />
    )
}

export const GoldenTextRow = ({justify, id, colors, markdownSide, markdownMain} ) => {
    const {width, height} = useWindowSize()


    const colorSide = "bg-" + colors.side
    const colorSideText = "text-" + colors.sideText
    const colorMain = "bg-" + colors.main
    const colorMainText = "text-" + colors.mainText

    let justifyOpposite = justify === "text-left" ? "text-right" : "text-left"

    let mainStyle = {}
    let sideStyle = {}
    if (width < 768) {
        mainStyle = {padding: "60px 20px 60px 20px"}
        // sideStyle = {padding: "60px 20px 60px 20px"}
        justify = "text-left"
        justifyOpposite = "text-left"
    } else if (justify === "text-left") {
        mainStyle = {padding: "60px 100px 60px 28%"}
    } else {
        mainStyle = {padding: "60px 28% 60px 100px"}
    }

    return (
        <Row id={id} className={"wedo " + colorSide}>
            <Col md={width >= 992 ? 4 : 5} xs={12} className={justify === "text-left" ? "display-none" : "desktop"}>
                <GoldenRowCard
                    style={sideStyle}
                    classNames={colorSideText + " side-block " + justify}
                    markdown={markdownSide}
                />
            </Col>
            <Col md={width >= 992 ? 8 : 7} xs={12} className={"no-padding " + colorMain}>
                <GoldenRowCard
                    style={mainStyle}
                    classNames={colorMainText + " " + justifyOpposite}
                    markdown={markdownMain}
                />
            </Col>
            <Col md={width >= 992 ? 4 : 5} xs={12} className={justify === "text-left" ? "" : "mobile"}>
                <GoldenRowCard
                    style={sideStyle}
                    classNames={colorSideText + " side-block " + justify}
                    markdown={markdownSide}
                />
            </Col>
        </Row>
    )
}

export const GoldenRowCard = ({ classNames, markdown, style={} } ) => {

    return (
        <div className={classNames} style={style}>
            <Markdown>
                {markdown}
            </Markdown>
        </div>
    );
}