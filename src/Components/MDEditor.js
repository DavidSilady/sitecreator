import * as React from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm'
import "react-mde/lib/styles/css/react-mde-all.css";
import {useEffect} from "react";

//https://codesandbox.io/s/react-mde-latest-forked-f9ti5?file=/src/index.js
//https://github.com/andrerpena/react-mde
export function MDEditor({content, handleSubmit, keyValue=""}) {
    const [value, setValue] = React.useState("");
    const [selectedTab, setSelectedTab] = React.useState("write");

    useEffect(() => {
        setValue(content)
    }, [content])

    return (
            <ReactMde
                key={keyValue}
                value={value}
                onChange={(value) => {setValue(value); handleSubmit(value)}}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(<ReactMarkdown plugins={gfm}>{markdown}</ReactMarkdown>)
                }
                childProps={{
                    writeButton: {
                        tabIndex: -1
                    }
                }}
            />
    );
}