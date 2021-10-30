import {RandomRectangles} from "./StylingAddons";
import {Col, Row} from "react-bootstrap";
import {Markdown} from "../Markdown";
import {useWindowSize} from "../../screen";
import {removeFirstOccurrence} from "../../helpers";

export function ParagraphBordered({markdown, backgroundColor}) {
    const {width, height} = useWindowSize()
    const borderColors = filterBorderColors(backgroundColor)

    const styling = {
        paddingTop: "80px",
        paddingLeft: "17%",
        paddingRight: "12%",
        paddingBottom: "60px",
        fontSize: "1.3rem",
        // fontWeight: "300",
        fontFamily: "Segoe UI Light"
    }
    if (width < 992) {
        styling.paddingLeft = "7%"
        styling.paddingRight = "7%"
        styling.fontSize = "1.15rem"
    }
    return (
        <Row className={`bg-${backgroundColor}`}>
            <Col xs={0} md={2} align={"left"}>
                <RandomRectangles colors={borderColors} number={5} range={10}/>
            </Col>
            <Col xs={12} md={8}>
                <div style={styling}>
                    <Markdown>
                        {markdown}
                    </Markdown>
                </div>
            </Col>
            <Col xs={0} md={2} align={"right"}>
                <RandomRectangles colors={borderColors} number={5} range={10}/>
            </Col>
        </Row>
    )
}

function filterBorderColors(backgroundColor) {
    const colors = ["green", "orange", "blue", "darkblue", "white"]
    return removeFirstOccurrence(backgroundColor, colors)
}