import logo from './logo.svg';
import './App.css';
import {TextArea} from "./Components/TextFieldEditor";
import {GoldenRow} from "./Components/BuildComponents/GoldenRow";
import {Container} from "react-bootstrap";
import {ComponentBuilder, EditableSiteBuilder, SiteBuilder} from "./Components/SiteBuilder";

const customComps = [
    {
        name: "GoldenRow",
        content: {
            title: "Title",
            subtitle: "Subtitle",
            justify: "text-right",
            img: "",
            bgColor: "orange",
            textColor: "white",
            imgColor: "green",
            href: "",
            markdown:
                "### **PONUKA LETNÝCH TÁBOROV 2022**\n" +
                "****\n" +
                "##### First minute ZĽAVA do 30.3.\n" +
                "\\\n" +
                "Pestrá ponuka letných táborov 2022 v najlepších rekreačných strediskách. Vida Loca - letný tábor pre tínedžerov, Vida Army - s vojenskou tematikou a airsoftom, Viva La Vida - nabitý atrakciami a v našom top stredisku či Vida YouTube & TikTok - pre začínajúcich influencerov. A to ani zďaleka nie je všetko.\n" +
                "\n" +
                ":button[Viac]{url=\"https://ckvida.sk/tabory\" color=\"white\" icon=\"\"}"
        }
    },
    {
        name: "GoldenRow",
        content: {
            title: "Title",
            subtitle: "Subtitle",
            justify: "text-left",
            img: "",
            bgColor: "green",
            textColor: "white",
            imgColor: "green",
            href: "",
            markdown:
                "**This is a test**\n\n" +
                "*Is it working?*" +
                "\n\n~no~" +
                "\n :button[Test]{text=\"shiiit\"}" +
                "\n# :icon[FaGraduationCap]",
        }
    },
]

function App() {
  return (
    <div>
        <Container fluid={true}>
            <EditableSiteBuilder
                initialComponents={
                    customComps
                }
            />
        </Container>
    </div>
  );
}

export default App;
