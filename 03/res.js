import { readInputFileContents } from "../utils/readInputFileContents.js"
const input = readInputFileContents("03/input.txt").replaceAll("\r\n", "")

const SYMBOLS = ["@", "#", "/", "=", "*", "+", "-", "$", "%", "&"]
const WIDTH = 141

function findNumericalValues(string) {
    const foundMatches = Array.from(string.matchAll(/\d+/gm)).map((match) => {
        return {
            startIndex: match["index"],
            endIndex: match["index"] + match["0"].length,
            value: match["0"],
        }
    })
    const values = foundMatches.map((match) => {
        return {
            ...match,
            symbol: findNeigboringText(match.startIndex, match.endIndex, string).replaceAll(".", ""),
            text: findNeigboringText(match.startIndex, match.endIndex, string),
        }
    })
    return values
}

function relativePosition(index) {
    // top/bottom/left/right/middle
    let boundaries = ""
    if (index == 0) boundaries += "T" 
    if (index >= WIDTH * (WIDTH - 1) ) boundaries += "B"
    if (index % WIDTH == 0) boundaries += "L"
    if (index % WIDTH == WIDTH - 1) boundaries += "R"
    return boundaries.length < 1 ? "M" : boundaries
}

function neighbors(indexStart, indexEnd) {
    
}

// width = 4
// 00 01 02 03
// 04 05 06 07
// 08 09 10 11
// 12 13 14 15