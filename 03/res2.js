import { readInputFileContents } from "../utils/readInputFileContents.js"
let input = readInputFileContents("03/input.txt").replaceAll("\r\n", "")

input = padGrid(input)
const width = Math.sqrt(input.length)

console.log(
    findGears(input).reduce((acc, el) => {
        return acc = acc + el[0]["value"] * el[1]["value"]
    }, 0)
)

function findGears(input) {
    const stars = findStars(input)
    const numbers = findNumbers(input)
    const gears = stars
        .map((star) => {
            const pairs = []
            const sIndexes = star.nears
            numbers.forEach((number) => {
                const common = [...number.indexes, ...sIndexes].filter((e, i, a) => a.indexOf(e) !== i)
                if (common.length > 0) pairs.push(number)
            })
            return pairs
        })
        .filter((gear) => gear.length > 1)
    return gears
}

function findStars(input) {
    const stars = Array.from(input.matchAll(/\*/g)).map((match) => {
        return {
            index: match.index,
            nears: [
                match.index - 1 - width,
                match.index - width,
                match.index + 1 - width,
                match.index - 1,
                match.index + 1,
                match.index + width - 1,
                match.index + width,
                match.index + width + 1,
            ],
        }
    })
    return stars
}

function findNumbers(input) {
    const matches = Array.from(input.matchAll(/\d+/g)).map((match) => {
        const indexes = []
        for (let i = match.index; i < match.index + match[0].length; i++) {
            indexes.push(i)
        }
        return {
            value: parseInt(match[0]),
            indexes,
        }
    })
    return matches
}

function padGrid(oldGrid) {
    const dot = "."
    const pad = 3
    const width = Math.sqrt(oldGrid.length)
    let newGrid = ""
    for (let i = 0; i < width; i++) {
        newGrid += dot.repeat(pad) + oldGrid.slice(i * width, (i + 1) * width) + dot.repeat(pad)
    }
    newGrid = dot.repeat(width + pad * 2).repeat(pad) + newGrid + dot.repeat(width + pad * 2).repeat(pad)
    return newGrid
}
