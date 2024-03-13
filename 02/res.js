import { readInputFileContents } from "../utils/readInputFileContents.js"
const input = readInputFileContents("02/input.txt")
    .split("\r\n")
    .map((line) => (line = line.replace(/.+: /g, "")))

const MAX = {
    red: 12,
    green: 13,
    blue: 14,
}

function colorValue(game, color) {
    const regex = new RegExp(`\\d+ ${color}`, "gi")
    const matches = Array.from(game.matchAll(regex)).map((match) => match[0])
    const maxColor = matches.reduce((prev, curr) => {
        const value = Number.parseInt(curr.match(/\d+/))
        return value > prev ? value : prev
    }, 0)
    return maxColor
}

function isGamePossible(game) {
    let possible = true
    for (let color of ["red", "green", "blue"]) {
        possible = possible && colorValue(game, color) <= MAX[color]
    }
    return possible
}

const solution1 = input.reduce((prev, curr, ind) => {
    const add = isGamePossible(curr) ? ind + 1 : 0
    return prev + add
}, 0)

function gamePower(game) {
    let power = 1
    for (let color of ["red", "green", "blue"]) {
        power *= colorValue(game, color)
    }
    return power
}

const solution2 = input.reduce((prev, curr) => prev + gamePower(curr), 0)