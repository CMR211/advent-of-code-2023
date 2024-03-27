import { readInputFileContents } from "../utils/readInputFileContents.js"
let input = readInputFileContents("03/input.txt").replaceAll("\r\n", "")

const SYMBOLS = ["@", "#", "/", "=", "*", "+", "-", "$", "%", "&"]
let WIDTH = Math.sqrt(input.length)
console.log(WIDTH)

// input = ".".repeat(WIDTH) + input.replaceAll(/^(.+)$/g, ".$1.") + ".".repeat(WIDTH)
// WIDTH +=2
// console.log(input)

function findNumericalValues(string) {
    const foundMatches = Array.from(string.matchAll(/\d+/gm)).map((match) => {
        return {
            startIndex: match["index"],
            endIndex: match["index"] + match["0"].length,
            value: parseInt(match["0"]),
        }
    })
    const values = foundMatches.map((match) => {
        return {
            ...match,
            symbol: findNeighbours(match.startIndex, match.endIndex).replaceAll(/\.|[0-9]/gm, ""),
            text: findNeighbours(match.startIndex, match.endIndex),
        }
    })
    return values
}

function relativePosition(indexStart, indexEnd) {
    // top/bottom/left/right/middle
    let boundaries = ""
    if (indexStart < WIDTH) boundaries += "T"
    if (indexStart >= WIDTH * (WIDTH - 1)) boundaries += "B"
    if (indexStart % WIDTH == 0) boundaries += "L"
    if (indexEnd % WIDTH == WIDTH - 1) boundaries += "R"
    return boundaries.length < 1 ? "M" : boundaries
}

function findNeighbours(iS, iE) {
    const position = relativePosition(iS, iE)

    if (position == "TL") return mapPos("FHI")
    if (position == "T") return mapPos("DFGHI")
    if (position == "TR") return mapPos("DGH")
    if (position == "L") return mapPos("BCFHI")
    if (position == "M") return mapPos("ABCDFGHI")
    if (position == "R") return mapPos("ABDGH")
    if (position == "BL") return mapPos("BCF")
    if (position == "B") return mapPos("ABCDF")
    if (position == "BR") return mapPos("ABD")
    function mapPos(str) {
        const neighbours = {
            A: input.slice(iS - WIDTH - 1, iS - WIDTH),
            B: input.slice(iS - WIDTH, iE - WIDTH),
            C: input.slice(iE - WIDTH, iE - WIDTH + 1),
            D: input.slice(iS - 1, iS),
            F: input.slice(iE, iE + 1),
            G: input.slice(iS + WIDTH - 1, iS + WIDTH),
            H: input.slice(iS + WIDTH, iE + WIDTH),
            I: input.slice(iE + WIDTH, iE + WIDTH + 1),
        }
        return str
            .split("")
            .map((p) => neighbours[p])
            .reduce((acc, s) => (acc += s), "")
    }
}
const res0 = findNumericalValues(input).filter((x) => x.symbol.length > 0)
const res1 = res0.reduce((acc, curr) => (acc += curr.value), 0)
console.log(res1)

