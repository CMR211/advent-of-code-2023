import { readInputFileContents } from "../utils/readInputFileContents.js"
const input = parseInput(readInputFileContents("./04/input.txt"))

console.log(solve2(input))

function solve2(input) {
    const winningNumbers = input.map((ln) => [ln[1].filter((item) => ln[0].includes(item)).length, 1])
    winningNumbers.forEach((card, index, array) => {
        const [win, qty] = card
        for (let i = 0; i < qty; i++) {
            for (let j = 1; j <= win; j++) {
                array[index + j][1] += 1
            }
        }
    })
    return winningNumbers.reduce((acc, curr) => acc + curr[1], 0)
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
