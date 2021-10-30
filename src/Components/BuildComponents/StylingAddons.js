import {getRandomInt, getRandomIntExcept} from "../../helpers";

export function RandomRectangles({number=5, colors=["green", "blue", "orange", "darkblue"], range=5}) {
    const rectangles = [];
    let percentLeft = 100;
    let baseHeight = 100 / number
    let colorIndex = -1;
    let lastColorIndex = -1;
    while (true) {
        let height = getRandomInt(baseHeight - range, baseHeight + range)
        colorIndex = getRandomIntExcept(0, colors.length, lastColorIndex)
        lastColorIndex = colorIndex
        if (percentLeft - height < range) {
            break;
        }
        rectangles.push(<div className={`bg-${colors[colorIndex]} material-shadow`} style={{height: height + "%", width: getRandomInt(20, 100) + "%"}}> </div>)
        percentLeft -= height;
    }
    rectangles.push(<div className={`bg-${colors[colorIndex]} material-shadow`} style={{height: percentLeft + "%", width: getRandomInt(20, 100) + "%"}}> </div>)
    return rectangles;
}

