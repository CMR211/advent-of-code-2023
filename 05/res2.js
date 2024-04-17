import { readInputFileContents } from "../utils/readInputFileContents.js"
const input = parseInput(readInputFileContents("./05/input.txt"))

let seeds = input[0]
let mappings = input.slice(1)

for (let i = 0; i < 7; i++) {
    // console.log("\nSeeds: \n", seeds, "\nMappings: \n", mappings[i])
    let newSeeds = []
    seeds.forEach((seed) => {
        const a = mapSeed(seed, mappings[i])
        a.forEach(i => newSeeds.push(i))
        // console.log("A: ", a)
    })
    // console.log("New Seeds: \n", seeds)
    seeds = newSeeds
}
seeds.sort((a,b) => a[0]-b[0])
console.log(seeds)

function mapSeed(seed, mappings) {
    const breakpoints = [seed[0], seed[1]]
    mappings.forEach((mp) => {
        if (mp[0] > seed[0] && mp[0] < seed[1]) breakpoints.push(mp[0] - 1, mp[0])
        if (mp[1] > seed[0] && mp[1] < seed[1]) breakpoints.push(mp[1], mp[1] + 1)
    })
    const newSeeds = breakpoints
        .sort((a, b) => a - b)
        .map((bp, i, a) => (i % 2 === 0 ? [a[i], a[i + 1]] : null))
        .filter((i) => i)
        .map((i) => {
            // console.log("Seed: ", i)
            const setMp = mappings.filter((mp) => i[0] >= mp[0] && i[1] <= mp[1])
            // console.log("mapping: ", setMp)
            if (setMp.length < 1) return i
            return [i[0] + setMp[0][2], i[1] + setMp[0][2]]
        })
    // console.log("\nFunction seeds: ", newSeeds)
    return newSeeds
}

export function parseInput(input) {
    const lines = input.split(/.+:\s/gm).map(splitLine).slice(1)
    const oldSeeds = lines[0].flat()
    const newSeeds = []
    for (let i = 0; i < oldSeeds.length / 2; i++) {
        newSeeds.push([oldSeeds[i * 2], oldSeeds[i * 2] + oldSeeds[i * 2 + 1] - 1])
    }
    const oldMappings = lines.slice(1)
    const newMappings = oldMappings.map((oldMapping) => {
        const newMapping = oldMapping.map((m) => {
            const begin = m[1]
            const end = m[1] + m[2] - 1
            const diff = m[0] - m[1]
            return [begin, end, diff]
        })
        return newMapping
    })

    return [newSeeds.sort((a, b) => a[0] - b[0]), ...newMappings]
}

function splitLine(line) {
    return line
        .split("\r\n")
        .filter((i) => i !== "")
        .map((i) => i.split(" ").map((e) => parseInt(e)))
}

// console.log([ 79, 14, 55, 13 ].map(seed => mapSeed(seed, [ [ 50, 98, 2 ], [ 52, 50, 48 ] ])))
