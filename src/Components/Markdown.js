import React from 'react'
import ReactMarkdown from 'react-markdown'
import {render} from 'react-dom'
import directive from 'remark-directive'
import  visit  from "unist-util-visit"
import { h } from "hastscript/html.js"
import gfm from "remark-gfm";
import {MDEditor} from "./MDEditor";
import {DynamicFaIcon} from "./IconRenderer";

const MyButton = ({text, href, children}) => {
    return (
        <div className={"bg-white text-blue"} style={{padding: "20px"}}>
            {text} {href} {children} THIS IS BUTTON
        </div>
    )
}

export const Markdown = ({className, children}) => {
    return (
        <ReactMarkdown
            components={components}
            plugins={gfm}
            remarkPlugins={[directive, htmlDirectives]}
        >
            {children}
        </ReactMarkdown>
    )
}

// react markdown components list
const components = {
    icon: DynamicFaIcon,
}

// remark plugin to add a custom tag to the AST
function htmlDirectives() {
    return transform

    function transform(tree) {
        visit(tree, ['textDirective', 'leafDirective', 'containerDirective'], ondirective)
    }

    function ondirective(node) {
        const data = node.data || (node.data = {})
        const hast = h(node.name, node.attributes)

        data.hName = node.name
        data.hProperties = hast.properties
    }
}

