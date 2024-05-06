import { readInputFileContents } from "../utils/readInputFileContents.js"

const TYPES = ["5", "41", "32", "311", "221", "2111", "11111"]
const CARDS = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"]

const input = parseInput()

const totalWinnings = input
    .map((x) => {
        return [x[0], parseInt(x[1]), power(x[0])]
    })
    .sort((a, b) => a[2] - b[2])
    .map((x, i) => [x[0], x[2], x[1], x[1] * (i + 1)])
    .reduce((a, x) => a + x[3], 0)

console.log(totalWinnings)

function parseInput() {
    const a = readInputFileContents("./07/input.txt").split("\r\n")
    return a.map((x) => x.split(" "))
}
function typeWithJokerOffset(card, type) {
    const jokers = Array.from(card.matchAll(/J/g)).length
    if (jokers === 1) {
        if (type === "41") return "5"
        if (type === "311") return "41"
        if (type === "221") return "32"
        if (type === "2111") return "311"
        if (type === "11111") return "2111"
    }
    if (jokers === 2) {
        if (type === "32") return "5"
        if (type === "221") return "41"
        if (type === "2111") return "311"
    }
    if (jokers === 3) {
        if (type === "32") return "5"
        if (type === "311") return "41"
    }
    if (jokers === 4) {
        if (type === "41") return "5"
    }
    return type
}
function power(card) {
    let cardType = type(card)
    cardType = typeWithJokerOffset(card, cardType)
    const typeValue = 10 - TYPES.indexOf(cardType)
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
    return code
}
