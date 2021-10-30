export function removeAllOccurrences(string, array) {
    return array.filter(e => e !== string)
}

export function removeFirstOccurrence(string, array) {
    return array.splice(array.indexOf(string), 1)
}