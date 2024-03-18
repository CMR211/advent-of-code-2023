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

function relativePosition(indexStart, indexEnd) {
    // top/bottom/left/right/middle
    let boundaries = ""
    if (indexStart == 0) boundaries += "T"
    if (indexStart >= WIDTH * (WIDTH - 1)) boundaries += "B"
    if (indexStart % WIDTH == 0) boundaries += "L"
    if (indexEnd % WIDTH == WIDTH - 1) boundaries += "R"
    return boundaries.length < 1 ? "M" : boundaries
}

function neighbors(iS, iE) {
    const position = relativePosition(iS, iE)
    const neighbours = {
        A: input.slice(iS - WIDTH - 1, iS - WIDTH),
        B: input.slice(iS - WIDTH, iE - WIDTH + 1),
        C: input.slice(iE - WIDTH + 1, iE - WIDTH + 2),
        D: input.slice(iS - 1, iS),
        F: input.slice(iE + 1, iE + 2),
        G: input.slice(iS + WIDTH - 1, iS + WIDTH),
        H: input.slice(iS + WIDTH, iE + WIDTH + 1),
        I: input.slice(iE + WIDTH + 1, iE + WIDTH + 2),
    }
    
}

// width = 4
// 00 01 02 03     A B C
// 04 05 06 07     D E F
// 08 09 10 11     G H I
// 12 13 14 15
