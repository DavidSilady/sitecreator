import logo from './logo.svg';
import './App.css';
import {TextArea} from "./Components/TextFieldEditor";
import {GoldenRow} from "./Components/GoldenRow";
import {ContextProvider} from "./Contexts/Context";
import {Container} from "react-bootstrap";
import {ComponentBuilder, EditableSiteBuilder, SiteBuilder} from "./Components/SiteBuilder";

const customComps = [
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
                "\n# :icon[FaCannabis]",
        }
    },
]

function App() {
  return (
    <div>
        <ContextProvider>
            <Container fluid={true}>
                <EditableSiteBuilder
                    initialComponents={
                        customComps
                    }
                />
            </Container>
        </ContextProvider>
    </div>
  );
}

export default App;
