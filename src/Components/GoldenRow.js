import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {Context} from "../Contexts/Context"
import Form from "@rjsf/material-ui";
import {ColorDisplay, colorPickerFormSchema} from "./ColorDisplay";
import {Button} from "@material-ui/core";
import {MarkdownArea} from "./TextFieldEditor";
import {Markdown} from "./Markdown";


const formSchema = {
    title: "Golden Row",
    type: "object",
    properties: {
        title: {type: "string", title: "Title"},
        color: colorPickerFormSchema,
    }
}

export const GoldenRowEditor = ({updateContent}) => {

    const onChange = ({formData}, e) => {
        console.log(formData)
    }

    const onSubmit = ({formData}, e) => {
        console.log("Data submitted: ", formData);
    }

    return (
        <div className={"container material-shadow"}
             style={{paddingBottom: "10px", margin: "20px", borderLeft: "3px solid #31b69c"}}>
            <Form schema={formSchema} onSubmit={onSubmit} onChange={onChange}/>
        </div>
    )
}

export const GoldenRowWrapper = ({content}) => {
    return (
        <GoldenRow
            title={content.title}
            subtitle={content.subtitle}
            colors={{bg: content.bgColor, text: content.textColor, img: content.imgColor}}
            justify={content.justify}
            id={content.id}
            img={content.img}
            href={content.href}
            markdown={content.markdown}
        />
    )
}

export const GoldenRow = ({ title, subtitle, justify, id, colors, img, href, markdown} ) => {

    const colorBG = "bg-" + colors.bg;
    const colorText = "text-" + colors.text;
    const colorImg = "text-" + colors.img

    return (
        <Context.Consumer>{context =>
            <Row id={id} className={"wedo " + colorBG}>
                <Col md={context.screenWidth >= 992 ? 4 : 5} xs={12} className={justify === "text-left" ? "display-none" : "desktop"}>
                    <GoldenRowCard classNames={colorText + " side-block " + justify}
                                   markdown={markdown}
                    />
                </Col>
                <Col md={context.screenWidth >= 992 ? 8 : 7} xs={12} className={"no-padding"}>
                    <GoldenRowImage
                        name={title}
                        classNames={{
                            div: "portfolio-img dark-filter ",
                            text: "portfolio-text name-tag desktop " + colorImg
                        }}
                        img={img}
                        context={context}
                        underText={subtitle}
                        href={href}
                    />
                </Col>
                <Col md={context.screenWidth >= 992 ? 4 : 5} xs={12} className={justify === "text-left" ? "" : "mobile"}>
                    <GoldenRowCard
                        classNames={"side-block " + justify}
                        markdown={markdown}
                    />
                </Col>
            </Row>
        }</Context.Consumer>
    )
}

export const GoldenRowCard = ({ classNames, markdown } ) => {

    return (
        <div className={classNames}>
            <Markdown>
                {markdown}
            </Markdown>
            {/*<h1 className={"w-head "}>{name}</h1>*/}
            {/*<h2 className={"w-desc "} style={{marginBottom: "35px"}}>{category}</h2>*/}
            {/*<p className={"w-text"}>{text}*/}
            {/*    <br/>*/}
            {/*</p>*/}
            {/*<div className={"w-text"}>*/}
            {/*    {button}*/}
            {/*</div>*/}
        </div>
    );
}

export const GoldenRowImage = ({context, underText, classNames, name, href, onClick, img, minHeight="400px" }) => {

    return (
        <a href={href}>
            <div className="portfolio-parent" style={{minHeight: minHeight}} onClick={onClick}>
                <div className={classNames.div} style={img ? {backgroundImage: `url(${img})`}: null}>
                    <h2 className={classNames.text} style={{maxWidth: "80%"}}>
                        {name}
                    </h2>
                    <h3 className="portfolio-under desktop" style={{maxWidth: "80%"}}>
                        {underText}
                    </h3>
                </div>
            </div>
        </a>
    );
}