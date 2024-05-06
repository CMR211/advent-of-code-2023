import { readInputFileContents } from "../utils/readInputFileContents.js"

const TYPES = ["5", "41", "32", "311", "221", "2111", "11111"]
const CARDS = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

const input = parseInput()

const totalWinnings = input
    .map((x) => {
        return [x[0], parseInt(x[1]), power(x[0])]
    })
    .sort((a, b) => a[2] - b[2])
    .map((x, i) => [x[0], x[1], x[1] * (i + 1)])
    .reduce((a, x) => a + x[2], 0)

console.log(totalWinnings)

function parseInput() {
    const a = readInputFileContents("./07/input.txt").split("\r\n")
    return a.map((x) => x.split(" "))
}

function power(card) {
    const typeValue = 10 - type(card)
    const cardsValue = card
        .split("")
        .map((c) => 99 - CARDS.indexOf(c))
        .join("")
    const cardValue = typeValue + cardsValue
    return parseInt(cardValue)
}

function type(card) {
    const figures = {}
    card.split("").forEach((fig) => {
        if (figures.hasOwnProperty(fig)) figures[fig]++
        else figures[fig] = 1
    })
    const code = Object.values(figures)
        .sort((a, b) => b - a)
        .join("")
    return parseInt(TYPES.indexOf(code))
}
