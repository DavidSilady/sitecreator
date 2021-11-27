import {RandomRectangles} from "./StylingAddons";
import {Col, Row} from "react-bootstrap";
import {Markdown} from "../Markdown";
import {useWindowSize} from "../../screen";
import {removeFirstOccurrence} from "../../helpers";
import {JsonSchemaWrapper} from "../JsonSchemaWrapper";
import {colorPickerFormSchema} from "../ColorDisplay";
import {MDEditor} from "../MDEditor";
import React from "react";


export function BannerEditor({updateContent, updateContentProp, content, index}) {
    const formSchema = {
        title: "Blog Paragraph",
        type: "object",
        properties: {
            imgHeight: {type: "number", title: "Image Height"}
        }
    }

    return (
        <JsonSchemaWrapper formSchema={formSchema} index={index} content={content} updateContent={updateContent}>
            <MDEditor content={content ? content.markdown : null} handleSubmit={(value) => updateContentProp("markdown", value)} key={`${index}_MDEditor`} keyValue={`${index}_MDEditorArea`}/>
        </JsonSchemaWrapper>
    )
}

export function BannerWrapper({content}) {
    return (
        <Banner markdown={content.markdown} img={content.img} imgHeight={content.imgHeight}/>
    )
}

export function Banner({markdown, img, imgHeight=400, id="banner"}) {

    return (
        <Row className={"wedo title"} id={id}>
            <Col xs={12} md={12} className={"no-padding"}>
                <div className={"container-fluid no-padding"}>
                    <div className={" title-img"} style={img ? {backgroundImage: `url(${img})`, minHeight: `${imgHeight}px`}: {minHeight: `${imgHeight}px`}}>
                        <div style={{width: "80%", marginRight: "auto", marginLeft: "auto"}}>
                            <Markdown>{markdown}</Markdown>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}
