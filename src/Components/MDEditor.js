import * as React from "react";
import {useEffect, useState} from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import {Markdown} from "./Markdown";
import * as Icons from "react-icons/fa";
import {FaIcons, FaImage, FaRegWindowMinimize} from "react-icons/fa";
import {BiInfoSquare} from "react-icons/bi";
import {MdWrapText} from "react-icons/md";
import {Box, Modal, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import reactModal from '@prezly/react-promise-modal';


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

    const customIcon = {
        name: "custom-icon",
        icon: () => (
            <FaIcons/>
        ),
        execute: async opts => {
            await reactModal(({show, onSubmit, onDismiss}) => (
                <IconModal onSubmit={onSubmit} onDismiss={onDismiss} show={show} opts={opts}/>
            ))
        }
    };

    const toolbarCommands = [
        [
            'header', 'bold', 'italic', 'custom-newline', 'custom-vertical-line'
        ],
        [
            'link', 'custom-img', 'custom-icon', 'custom-button'
        ],
        [
            'unordered-list', 'ordered-list', 'checked-list'
        ]
    ]

    const commands = {
        'custom-img': customImg,
        'custom-icon': customIcon,
        'custom-button': customButton,
        'custom-newline': customNewline,
        'custom-vertical-line': customVerticalLine,
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

function IconModal({show, onDismiss, onSubmit, opts,}) {
    const [searchTerm, setSearchTerm] = useState("")

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

    return (
        <Modal open={show} onClose={onDismiss} title={<h1>Test</h1>}>
            <Box sx={modalStyle}>
                <div style={{padding: "20px"}}>
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
                </div>
                <Grid container spacing={2}>
                    {Object.keys(Icons)
                        .filter(key => key.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(key => {
                            const IconComponent = Icons[key]
                            return (
                                <Grid item xs={3} key={key}>
                                    <a
                                        onClick={() => {
                                            opts.textApi.replaceSelection(`:icon[${key}]`);
                                            const {start, end} = opts.textApi.getState().selection
                                            opts.textApi.setSelectionRange({start: start - key.length, end: end - 1})
                                            onSubmit()
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
    execute: opts => {
        opts.textApi.replaceSelection(':button[Text]{url="https://ckvida.sk" color="white" icon=""}');
        const {start, end} = opts.textApi.getState().selection
        opts.textApi.setSelectionRange({start: start - 41, end: end - 24})
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