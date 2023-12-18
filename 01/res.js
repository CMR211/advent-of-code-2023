import { readInputFileContents } from "../utils/readInputFileContents.js"

const input = readInputFileContents("01/input.txt").split("\n")

const DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
const LETTERS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

function parseOnlyNumbers(line) {
    const numbers = line.replaceAll(/\D/gm, "")
    return Number.parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`)
}

function solution1() {
    const res = input.map((i) => parseOnlyNumbers(i)).reduce((a, b) => a + b, 0)
    return res
}

function getFrontValues(line) {
    const values = []
    for (let i = 1; i <= line.length; i++) {
        values.push(line.slice(0, i))
    }
    return values
}

function getBackValues(line) {
    const values = []
    for (let i = line.length - 1; i >= 0; i--) {
        values.push(line.slice(i, line.length))
    }
    return values
}

function findValue(values) {
    let result
    const lookups = [...LETTERS, ...DIGITS]
    for (let value of values) {
        for (let lookup of lookups) {
            if (value.includes(lookup)) {
                if (lookup.length > 1) {
                    return LETTERS.indexOf(lookup) + 1
                } else return Number.parseInt(lookup)
            }
        }
    }
    return result
}

function solution2() {
    const newInput = input.map((line) => {
        const beginning = findValue(getFrontValues(line))
        const ending = findValue(getBackValues(line))
        return beginning * 10 + ending
    })
    console.log(newInput)
    return newInput.reduce((a, b) => a + b, 0)
}

console.log(solution2())
