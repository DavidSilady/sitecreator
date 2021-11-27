import {BsLayoutWtf} from "react-icons/bs";
import {GoldenRowEditor, GoldenRowWrapper} from "./BuildComponents/GoldenRow";
import {RiLayoutMasonryFill, RiLayoutRightFill} from "react-icons/ri";
import {BlogParagraphEditor, BlogParagraphWrapper} from "./BuildComponents/BlogParagraph";
import {ImParagraphLeft} from "react-icons/im";
import {GoldenTextRowEditor, GoldenTextRowWrapper} from "./BuildComponents/GoldenTextRow";

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
    imgColor: "white",
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

const defaultGoldenTextRowContent = {
    sideColor: "blue",
    sideTextColor: "white",
    mainColor: "white",
    mainTextColor: "blue",
    justify: "text-left",
    markdownMain: "### Cestovná kancelária Vida a Rekreačné strediská Slovakia\n" +
        "\n" +
        "****\n" +
        "\n" +
        "**Cestovná kancelária Vida vznikla na pevných základoch spoločnosti Rekreačné strediská Slovakia.** Jej základ tvoria ľudia, ktorí majú bohaté skúsenosti v oblasti detského cestovného ruchu. Skúsenosti, ktoré sme nadobudli, dnes pretvárame do vlastných produktov a služieb.\n" +
        "\n" +
        ":button[o nás]{url=\"/about-us\" color=\"orange\" icon=\"\"}",
    markdownSide: "### **Kontakt**\n" +
        "\n" +
        "##### Juraj\n" +
        "\n" +
        "Juraj Mikuš\\\n" +
        "[:icon[FaEnvelope] juraj@ckvida.sk](mailto:juraj@ckvida.sk)\\\n" +
        "[:icon[FaPhoneAlt] 0905 221 383](tel:0905221383)\n" +
        "\n" +
        "Paulína Mojtová\\\n" +
        "[:icon[FaEnvelope] paula@ckvida.sk](mailto:paula@ckvida.sk)\\\n" +
        "[:icon[FaPhoneAlt] 0915 031 670](tel:0915031670)\n" +
        "\n" +
        "**Pracovná doba**\\\n" +
        "Pondelok - Piatok\\\n" +
        "08:00 - 14:00",
}

export const componentMap = {
    "GoldenRow": new CustomComponent(GoldenRowWrapper, GoldenRowEditor, "Golden Row", <RiLayoutRightFill/>, defaultGoldenRowContent),
    "GoldenTextRow": new CustomComponent(GoldenTextRowWrapper, GoldenTextRowEditor, "Golden Text Row", <RiLayoutRightFill/>, defaultGoldenTextRowContent),
    "ParagraphBordered": new CustomComponent(BlogParagraphWrapper, BlogParagraphEditor, "Paragraph Bordered", <ImParagraphLeft/>, defaultParagraphBorderedContent),
}