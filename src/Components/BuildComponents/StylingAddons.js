
export function RandomRectangles({number=5, colors=["bg-green", "bg-blue", "bg-orange", "bg-darkblue"], range=5}) {
    const rectangles = [];
    let percentLeft = 100;
    let baseHeight = 100 / number
    let colorIndex = -1;
    let lastColorIndex = -1;
    while (true) {
        let height = getRandomInt(baseHeight - range, baseHeight + range)
        colorIndex = getRandomInt(0, colors.length, lastColorIndex)
        lastColorIndex = colorIndex
        if (percentLeft - height < range) {
            break;
        }
        rectangles.push(<div className={`bg-${colors[colorIndex]} material-shadow`} style={{height: height + "%", width: getRandomInt(20, 100) + "%"}}> </div>)
        percentLeft = percentLeft - height;
    }
    rectangles.push(<div className={`bg-${colors[colorIndex]} material-shadow`} style={{height: percentLeft + "%", width: getRandomInt(20, 100) + "%"}}> </div>)
    return rectangles;
}

export function getRandomInt(min=0, max=0, except = -1) {
    min = Math.ceil(min)
    max = Math.floor(max)
    let output =  Math.floor(Math.random() * (max - min) + min)//The maximum is exclusive and the minimum is inclusive
    while (output === except) {
        output = Math.floor(Math.random() * (max - min) + min)
    }
    return output
}