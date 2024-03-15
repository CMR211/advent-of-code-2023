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

