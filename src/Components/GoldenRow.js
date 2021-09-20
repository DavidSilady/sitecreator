import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {Context} from "../Contexts/Context";
import Loader from "react-loader-spinner";
import {useForm} from "react-hook-form";
import {Button, IconButton, Input, InputLabel, MenuItem, Select} from "@material-ui/core";
import {FlatButton} from "material-ui";
import FormControl from "@material-ui/core/FormControl";

export const GoldenRowEditor = ({updateContent}) => {
    const {register, handleSubmit } = useForm({

    })

    const onSubmit = (data) => {
        console.log("working")
        console.log(data)
    }

    return (
        <div className={"container material-shadow"}
             style={{paddingBottom: "10px", margin: "20px", borderLeft: "3px solid #31b69c"}}>
            <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", justifyContent: "space-evenly"}}>
                <Input  {...register('test.firstName')}/>
                <FormControl>
                    <InputLabel id={"color_label"}>Color</InputLabel>
                    <Select variant={"standard"} labelId={"color_label"} {...register("color")}>
                        <MenuItem value={"green"}>green</MenuItem>
                        <MenuItem value={"orange"}>orange</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    type={"submit"}
                    variant={"contained"}
                    color={"primary"}
                >
                    Submit
                </Button>
            </form>

        </div>
    )
}

export const GoldenRowWrapper = ({content}) => {
    return (
        <GoldenRow name={content.name} justify={content.justify} text={content.text} img={content.img} category={content.category} color={content.color}/>
    )
}

export const GoldenRow = ({ justify, name, id, color, imgClass, img, text, category, underText, button, href, onClick} ) => {
    // Based on planetaZem value React will render details about Planeta Zem or Viva La Vida.

    const colorBG = "bg-" + color.bg;
    const colorText = "text-" + color.text;
    const colorImg = "text-" + color.img

    return (
        <Context.Consumer>{context =>
            <Row id={id} className={"wedo " + colorBG}>
                <Col md={context.screenWidth >= 992 ? 4 : 5} xs={12} className={justify === "text-left" ? "display-none" : "desktop"}>
                    {/* Passing all values into Component as a React props */}
                    <GoldenRowCard classNames={colorText + " side-block " + justify}
                                   text={text}
                                   name={name}
                                   category={category}
                                   button={button}
                    />
                </Col>
                <Col md={context.screenWidth >= 992 ? 8 : 7} xs={12} className={"no-padding"} onClick={onClick}>
                    {/* Passing all values into Component as a React props */}
                    <GoldenRowImage
                        name={name}
                        classNames={{
                            div: "portfolio-img dark-filter " + imgClass,
                            text: "portfolio-text name-tag desktop " + colorImg
                        }}
                        img={img}
                        context={context}
                        underText={underText}
                        href={href}
                    />
                </Col>
                <Col md={context.screenWidth >= 992 ? 4 : 5} xs={12} className={justify === "text-left" ? "" : "mobile"}>
                    <GoldenRowCard
                        classNames={"side-block " + justify}
                        name={name}
                        text={text}
                        category={category}
                        button={button}
                    />
                </Col>
            </Row>
        }</Context.Consumer>
    )
}

const GoldenRowCard = (props) => {
    // these are values, which are different for each skola v prirode
    const { classNames, name, text, category, button } = props;

    return (
        <div className={classNames}>
            <h1 className={"w-head "}>{name}</h1>
            <h2 className={"w-desc "} style={{marginBottom: "35px"}}>{category}</h2>
            <p className={"w-text"}>{text}
                <br/>
            </p>
            <div className={"w-text"}>
                {button}
            </div>
        </div>
    );
}

export const GoldenRowImage = ({context, underText, classNames, name, href, onClick, img, minHeight="400px" }) => {
    // these are values, which are different for each skola v prirode
    // context is needed because of skolaPrirodeClicked function

    return (
        // if user click on this container and value of planetaZem is true React will render details about Planeta Zem inside Main Component
        // otherwise it will render details about Viva La Vida
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