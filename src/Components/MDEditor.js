import * as React from "react";
import {useEffect, useState} from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import {Markdown} from "./Markdown";
import * as Icons from "react-icons/fa";
import {FaEnvelope, FaIcons, FaImage, FaPhoneAlt, FaRegWindowMinimize} from "react-icons/fa";
import {BiInfoSquare} from "react-icons/bi";
import {MdWrapText} from "react-icons/md";
import {Box, Button, Modal, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import reactModal from '@prezly/react-promise-modal';
import {JsonSchemaWrapper} from "./JsonSchemaWrapper";
import {colorPickerFormSchema} from "./ColorDisplay";
import {getObjectFieldTemplate} from "./GridFormObjectTemplate";
import Form from "@rjsf/material-ui";
import {DynamicFaIcon} from "./MarkdownComponents/IconRenderer";
import {MarkdownCursive} from "./MarkdownComponents/MarkdownCursive";
import {RiArrowLeftRightFill} from "react-icons/all";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: "70%",
    height: "100%",
    overflow: "scroll",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

//https://codesandbox.io/s/react-mde-latest-forked-f9ti5?file=/src/index.js
//https://github.com/andrerpena/react-mde
export function MDEditor({content, handleSubmit, keyValue = ""}) {
    const [value, setValue] = React.useState("");
    const [selectedTab, setSelectedTab] = React.useState("write");
    const [iconModalOpen, setIconModalOpen] = useState(false)


    function onIconModalOpen() {
        setIconModalOpen(true)
    }

    function onIconModalClose() {
        setIconModalOpen(false)
    }

    useEffect(() => {
        setValue(content)
    }, [content])

    // const toolbarCommands = getDefaultToolbarCommands()
    // console.log(toolbarCommands)
    // toolbarCommands[0] = ['header', 'bold', 'italic']

    const toolbarCommands = [
        [
            'header', 'bold', 'italic', 'custom-newline', 'custom-vertical-line',
        ],
        [
            'link', 'custom-img', 'custom-icon', 'custom-button',
        ],
        [
            'unordered-list', 'ordered-list', 'checked-list', 'custom-row',
        ],
        [
            'custom-mail-link', 'custom-tel-link',
        ],
        [
            'custom-cursive',
        ],
    ]

    const commands = {
        'custom-img': customImg,
        'custom-icon': customIcon,
        'custom-button': customButton,
        'custom-newline': customNewline,
        'custom-vertical-line': customVerticalLine,
        'custom-mail-link': customMailLink,
        'custom-tel-link': customTelLink,
        'custom-cursive': customCursive,
        'custom-row': customRow,
    }

    return (
        <>
            <ReactMde
                key={keyValue}
                value={value}
                commands={commands}
                toolbarCommands={toolbarCommands}
                onChange={(value) => {
                    setValue(value);
                    handleSubmit(value)
                }}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(<Markdown>{markdown}</Markdown>)
                }
                childProps={{
                    writeButton: {
                        tabIndex: -1
                    }
                }}
            />
        </>

    );
}

const modalButtonJsonForm = {
    title: "Button",
    type: "object",
    properties: {
        color: colorPickerFormSchema("Color"),
        url: {type: "string", title: "Url"},
        minWidth: {type: "number", title: "Min Width"},
        text: {type: "string", title: "Text"},
    }
}

function ButtonModal({show, onDismiss, onSubmit, opts}) {
    // const [icon, setIcon] = useState("")

    let icon = ""
    return (
        <Modal open={show} onClose={onDismiss} title={<h1>Test</h1>}>
            <Box sx={modalStyle}>
                <div style={{paddingTop: "20px"}}>
                    <Button variant={'contained'} onClick={async () => {
                        const key = await reactModal(({show, onDismiss, onSubmit}) => (
                            <IconModal onSubmit={onSubmit} onDismiss={onDismiss} show={show} current={icon}/>
                        ))
                        if (key) {
                            // setIcon(key)
                            icon = key
                        } else {
                            // setIcon("")
                            icon = ""
                        }
                    }}>
                        Pick Icon
                    </Button>
                </div>

                <Form schema={modalButtonJsonForm} onSubmit={({formData}, e) => {
                    onSubmit({
                        ...formData,
                        icon: icon
                    })
                }}
                      idPrefix={"button-modal"}
                      uiSchema={{
                          "ui:ObjectFieldTemplate": getObjectFieldTemplate(4),
                      }}
                      // children={true}
                      key={"rjsf-main-button-modal"}
                    // liveValidate
                />

            </Box>
        </Modal>
    )
}

function IconModal({show, onDismiss, onSubmit, current=""}) {
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <Modal open={show} onClose={onDismiss} title={<h1>Test</h1>}>
            <Box sx={modalStyle}>
                <div style={{padding: "20px", display: "flex"}}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Search"
                        value={searchTerm}
                        onChange={(event) => {
                            console.log(event.target.value)
                            console.log(searchTerm)
                            setSearchTerm(event.target.value)
                        }}
                    />
                    <div style={{paddingTop: "20px", marginLeft: "auto", textAlign: "center"}}>
                        <h3 ><DynamicFaIcon children={current}/></h3>
                        <p>{current} {current ? "(current)" : "" }</p>
                    </div>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={3} key={"None"}>
                        <a
                            onClick={() => {
                                onSubmit("")
                            }}
                            className={"icon-picker"}
                            style={{
                                padding: "5px",
                                margin: "0px",
                            }}
                        >
                            <h3><br/></h3>
                            <p>
                                None
                            </p>
                        </a>
                    </Grid>
                    {Object.keys(Icons)
                        .filter(key => key.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(key => {
                            const IconComponent = Icons[key]
                            return (
                                <Grid item xs={3} key={key}>
                                    <a
                                        onClick={() => {
                                            onSubmit(key)
                                        }}
                                        className={"icon-picker"}
                                        style={{
                                            padding: "5px",
                                            margin: "0px",
                                        }}
                                    >
                                        <h3><IconComponent/></h3>
                                        <p>
                                            {key}
                                        </p>
                                    </a>
                                </Grid>
                            )
                        })}
                </Grid>
            </Box>
        </Modal>
    )
}

const customIcon = {
    name: "custom-icon",
    icon: () => (
        <FaIcons/>
    ),
    execute: async opts => {
        const key = await reactModal(({show, onSubmit, onDismiss}) => (
            <IconModal onSubmit={onSubmit} onDismiss={onDismiss} show={show} opts={opts}/>
        ))
        if (key) {
            opts.textApi.replaceSelection(`:icon[${key}]`);
            const {start, end} = opts.textApi.getState().selection
            opts.textApi.setSelectionRange({start: start - (key.length + 1), end: end - 1})
        }
    }
};


const customImg = {
    name: "custom-img",
    icon: () => (
        <FaImage/>
    ),
    execute: opts => {
        opts.textApi.replaceSelection(':img[https://ckvida.sk/banners/home-banner-top.jpg]{width="100%"}');
        const {start, end} = opts.textApi.getState().selection
        opts.textApi.setSelectionRange({start: start - 60, end: end - 15})
    }
};

const customButton = {
    name: "custom-button",
    icon: () => (
        <BiInfoSquare/>
    ),
    execute: async opts => {
        const data = await reactModal(({show, onSubmit, onDismiss}) => (
            <ButtonModal opts={opts} show={show} onDismiss={onDismiss} onSubmit={onSubmit}/>
        ))
        if (data) {
            opts.textApi.replaceSelection(
                `:button[${data.text ? data.text : "text"}]{url="${data.url}" color="${data.color ? data.color : "white"}" icon="${data.icon ? data.icon : ""}"${data.minWidth ? `minWidth="${data.minWidth}px"` : ``}}`)
            const {start, end} = opts.textApi.getState().selection
            opts.textApi.setSelectionRange({start: start - 41, end: end - 24})
        }

    }
}

const customNewline = {
    name: "custom-newline",
    icon: () => (
        <MdWrapText/>
    ),
    execute: opts => {
        opts.textApi.replaceSelection('\\');
    }
}

const customVerticalLine = {
    name: "custom-vertical-line",
    icon: () => (
        <FaRegWindowMinimize/>
    ),
    execute: opts => {
        opts.textApi.replaceSelection('\n****\n');
    }
}

const customMailLink = {
    name: "custom-mail-link",
    icon: () => (
        <FaEnvelope/>
    ),
    execute: opts => {
        const exampleMail = 'example@mail.com'
        opts.textApi.replaceSelection(`[:icon[FaEnvelope] text](mailto:${exampleMail})`)
        const {start, end} = opts.textApi.getState().selection
        opts.textApi.setSelectionRange({start: start - (exampleMail.length + 1), end: end - 1})
    }
}

const customTelLink = {
    name: "custom-tel-link",
    icon: () => (
        <FaPhoneAlt/>
    ),
    execute: opts => {
        const exampleTel = '0905666420'
        opts.textApi.replaceSelection(`[:icon[FaPhoneAlt] text](tel:${exampleTel})`)
        const {start, end} = opts.textApi.getState().selection
        opts.textApi.setSelectionRange({start: start - (exampleTel.length + 1), end: end - 1})
    }
}

const customCursive = {
    name: "custom-cursive",
    icon: () => (
        <MarkdownCursive children={"Cursive"}/>
    ),
    execute: opts => {
        opts.textApi.replaceSelection(`:cursive[]`)
        const {start, end} = opts.textApi.getState().selection
        opts.textApi.setSelectionRange({start: start - 1, end: end - 1})
    },
}

const customRow = {
    name: "custom-row",
    icon: () => (
        <RiArrowLeftRightFill/>
    ),
    execute: opts => {
        const example = "Row Content"
        opts.textApi.replaceSelection(`:row[\n${example}\n]`)
        const {start, end} = opts.textApi.getState().selection
        opts.textApi.setSelectionRange({start: start - (example.length + 2), end: end - 2})
    }
}