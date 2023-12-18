import fs from "node:fs"

export function readInputFileContents(path) {
    const inputFilePath = `C:/Users/surmab/Documents/git/advent-of-code-2023-js/${path}`
    const input = fs.readFileSync(inputFilePath, "utf-8")
    return input
}
