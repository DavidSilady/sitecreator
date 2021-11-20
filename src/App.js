import logo from './logo.svg';
import './App.css';
import {TextArea} from "./Components/TextFieldEditor";
import {GoldenRow} from "./Components/BuildComponents/GoldenRow";
import {Container} from "react-bootstrap";
import {ComponentBuilder, EditableSiteBuilder, SiteBuilder} from "./Components/SiteBuilder";

function App() {
  return (
    <div>
        <Container fluid={true}>
            <EditableSiteBuilder
                initialComponents={
                    []
                }
                initialConfig={
                    {endpoint: "empty", display: false}
                }
            />
        </Container>
    </div>
  );
}

export default App;
