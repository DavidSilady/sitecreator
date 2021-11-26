import {BsLayoutWtf} from "react-icons/bs";
import {GoldenRowEditor, GoldenRowWrapper} from "./BuildComponents/GoldenRow";
import {RiLayoutMasonryFill, RiLayoutRightFill} from "react-icons/ri";
import {BlogParagraphEditor, BlogParagraphWrapper} from "./BuildComponents/BlogParagraph";
import {ImParagraphLeft} from "react-icons/im";

class CustomComponent {
    constructor(jsx, editor, name="", icon=<BsLayoutWtf/>, defaultContent={}) {
        this.name = name
        this.icon = icon
        this.Jsx = jsx
        this.Editor = editor
        this.content = {}
        this.defaultContent = defaultContent
    }
}

const defaultParagraphBorderedContent = {
    backgroundColor: "orange",
    borderDensity: 5,
    displayBorders: false,
    markdown:
        "### :icon[FaCampground] **PONUKA LETNÝCH TÁBOROV**\n" +
        "****\n" +
        "##### First minute ZĽAVA\n" +
        "\\\n" +
        "Pestrá ponuka letných táborovv najlepších rekreačných strediskách.\n" +
        "\n" +
        ":button[Viac]{url=\"https://ckvida.sk/tabory\" color=\"white\" icon=\"\"}"
}

const defaultGoldenRowContent = {
    title: "This is the title",
    subtitle: "This is the subtitle",
    justify: "text-right",
    img: "",
    bgColor: "orange",
    textColor: "white",
    imgColor: "green",
    href: "",
    markdown:
        "### **PONUKA LETNÝCH TÁBOROV**\n" +
        "****\n" +
        "##### First minute ZĽAVA\n" +
        "\\\n" +
        "Pestrá ponuka letných táborov v najlepších rekreačných strediskách.\n" +
        "\n" +
        ":button[Viac]{url=\"https://ckvida.sk/tabory\" color=\"white\" icon=\"\"}"
}

export const componentMap = {
    "GoldenRow": new CustomComponent(GoldenRowWrapper, GoldenRowEditor, "Golden Row", <RiLayoutRightFill/>, defaultGoldenRowContent),
    "ParagraphBordered": new CustomComponent(BlogParagraphWrapper, BlogParagraphEditor, "Paragraph Bordered", <ImParagraphLeft/>, defaultParagraphBorderedContent),
}