import { readInputFileContents } from "../utils/readInputFileContents.js"
const input = parseInput(readInputFileContents("./05/test-input.txt"))

solve2()

function solve2() {
    let seeds = input.seeds
    const mappings = Object.values(input).slice(1)
    for (let i = 0; i< mappings.length; i++) {
        seeds = seeds.map(seed => mapSeed(seed, mappings[i]))
    }
    console.log(Math.min(...seeds))
}

function parseInput(input) {
    let lines = input.split(/.+:\s/gm).map(splitLine)
    const obj = {
        seeds: lines[1].flat(),
        seedToSoil: lines[2],
        soilToFertilizer: lines[3],
        fertilizerToWater: lines[4],
        waterToLight: lines[5],
        lightToTemperature: lines[6],
        temperatureToHumidity: lines[7],
        humidityToLocation: lines[8],
    }
    return obj
}

function mapSeed(seed, mappings) {
    const ranges = mappings.map((m) => [m[1], m[1] + m[2] - 1, m[0] - m[1]])
    for (let range of ranges) {
        if (seed >= range[0] && seed <= range[1]) return seed + range[2]
    }
    return seed
}

function splitLine(line) {
    return line
        .split("\r\n")
        .filter((i) => i !== "")
        .map((i) => i.split(" ").map((e) => parseInt(e)))
}

// console.log([ 79, 14, 55, 13 ].map(seed => mapSeed(seed, [ [ 50, 98, 2 ], [ 52, 50, 48 ] ])))
