export function removeAllOccurrences(string, array) {
    return array.filter(e => e !== string)
}

export function removeFirstOccurrence(string, array) {
    array.splice(array.indexOf(string), 1)
    return array
}

export function getRandomInt(min=0, max=0) {
    min = Math.ceil(min)
    max = Math.floor(max)
    //The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min) + min)
}

export function getRandomIntExcept(min=0, max=0, except = -1) {
    if (max - min >= 2) {
        min = Math.ceil(min)
        max = Math.floor(max)
        let output =  Math.floor(Math.random() * (max - min) + min)//The maximum is exclusive and the minimum is inclusive
        while (output === except) {
            output = Math.floor(Math.random() * (max - min) + min)
        }
        return output
    }
}