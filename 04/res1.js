import { readInputFileContents } from "../utils/readInputFileContents.js"
const input = parseInput(readInputFileContents("./04/input.txt"))

solve1(input)

function solve1(input) {
    const winningNumbers = input.map((ln) => ln[1].filter((item) => ln[0].includes(item)))
    const totalPoints = winningNumbers.reduce((acc, el) => acc + Math.floor(2 ** (el.length - 1)), 0)
    console.log(totalPoints)
    return totalPoints
}

function parseInput(input) {
    return input.split("\r\n").map((ln) => {
        const spl = ln.split(/\:|\|/g)
        return [spl[1].split(" ").filter(filterBlankStrings), spl[2].split(" ").filter(filterBlankStrings)]
    })
}

function filterBlankStrings(string) {
    return !(string === "")
}
