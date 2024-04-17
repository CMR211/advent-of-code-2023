import { readInputFileContents } from "../utils/readInputFileContents.js"
import test from "node:test"
import assert from "node:assert"
import { mapSeedWithMapping, parseInput } from "./res2.js"
const input = parseInput(readInputFileContents("./05/test-input.txt"))

console.log(mapSeedWithMapping([55, 67], [50, 51, 48]))

test("top boundary miss is unchanged", (t) => {
    assert.deepStrictEqual(mapSeedWithMapping([55, 67], [50, 51, 48]), [55, 67])
})
test("bottom boundary miss is unchanged", (t) => {
    assert.deepStrictEqual(mapSeedWithMapping([-2, 49], [50, 51, 48]), [-2, 49])
})
test("top equal is correctly evaluated", (t) => {
    assert.deepStrictEqual(mapSeedWithMapping([-2, 52], [50, 55, 12]), [
        [-2, 49],
        [62, 64],
    ])
})
test("mid is correctly evaluated", (t) => {
    assert.deepStrictEqual(mapSeedWithMapping([13, 20], [11, 50, 12]), [25, 32])
})
test("sequence spanning across all ranges is correctly evaluated", (t) => {
    assert.deepStrictEqual(mapSeedWithMapping([5, 55], [10, 50, 11]), [
        [5, 9],
        [21, 61],
        [51, 55],
    ])
})
console.log(mapSeedWithMapping([13, 20], [11, 50, 12]))
