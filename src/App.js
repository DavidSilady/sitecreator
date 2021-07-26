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
            name: "Whateveer",
            justify: "text-left",
            text: "this is a a testtstst st",
            img: "",
            category: "test",
            color: {
                bg: "orange",
                text: "white",
                img: "orange"
            }
        }
    },
    {
        name: "GoldenRow",
        content: {
            name: "WSHHSI",
            justify: "text-right",
            text: "this is a a testtstst st",
            img: "",
            category: "test",
            color: {
                bg: "green",
                text: "white",
                img: "white"
            }
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
