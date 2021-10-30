import {BsLayoutWtf} from "react-icons/bs";
import {GoldenRowEditor, GoldenRowWrapper} from "./BuildComponents/GoldenRow";
import {RiLayoutMasonryFill, RiLayoutRightFill} from "react-icons/ri";
import {BlogParagraphEditor, BlogParagraphWrapper} from "./BuildComponents/BlogParagraph";

class CustomComponent {
    constructor(jsx, editor, name="", icon=<BsLayoutWtf/>) {
        this.name = name
        this.icon = icon
        this.Jsx = jsx
        this.Editor = editor
        this.content = {}
    }
}

export const components = {
    "GoldenRow": new CustomComponent(GoldenRowWrapper, GoldenRowEditor, "Golden Row", <RiLayoutRightFill/>),
    "ParagraphBordered": new CustomComponent(BlogParagraphWrapper, BlogParagraphEditor, "Paragraph Bordered", <RiLayoutMasonryFill/>),
}