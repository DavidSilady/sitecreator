import * as React from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm'
import "react-mde/lib/styles/css/react-mde-all.css";
import {useEffect} from "react";
import {Markdown} from "./Markdown";
import { getDefaultToolbarCommands } from 'react-mde'
import {FaIcons, FaImage} from "react-icons/fa";

//https://codesandbox.io/s/react-mde-latest-forked-f9ti5?file=/src/index.js
//https://github.com/andrerpena/react-mde
export function MDEditor({content, handleSubmit, keyValue=""}) {
    const [value, setValue] = React.useState("");
    const [selectedTab, setSelectedTab] = React.useState("write");

    useEffect(() => {
        setValue(content)
    }, [content])

    // const toolbarCommands = getDefaultToolbarCommands()
    // console.log(toolbarCommands)
    // toolbarCommands[0] = ['header', 'bold', 'italic']

    const toolbarCommands = [
        [
            'header', 'bold', 'italic'
        ],
        [
            'link', 'custom-img', 'custom-icon'
        ],
        [
            'unordered-list', 'ordered-list', 'checked-list'
        ]
    ]

    const commands = {
        'custom-img': customImg,
        'custom-icon': customIcon,
    }
    return (
            <ReactMde
                key={keyValue}
                value={value}
                commands={commands}
                toolbarCommands={toolbarCommands}
                onChange={(value) => {setValue(value); handleSubmit(value)}}
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
    );
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

const customIcon = {
    name: "custom-icon",
    icon: () => (
        <FaIcons/>
    ),
    execute: opts => {
        opts.textApi.replaceSelection(':icon[FaIcons]');
        const {start, end} = opts.textApi.getState().selection
        opts.textApi.setSelectionRange({start: start - 8, end: end - 1})
    }
};