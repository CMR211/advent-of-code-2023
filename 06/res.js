function distance(time, maxTime) {
    return time * (maxTime - time)
}

function time(distance, maxTime) {
    const delta = Math.sqrt(maxTime ** 2 - 4 * distance)
    const solutions = [Math.ceil(0.5 * (maxTime - delta)), Math.floor(0.5 * (maxTime + delta))]
    return solutions
}

function waysOfWinning(distance, maxTime) {
    const [a, b] = time(distance, maxTime)
    return b - a + 1
}

const input = [
    [62, 644],
    [73, 1023],
    [75, 1240],
    [65, 1023],
]

const winningTimes = input.map((race) => waysOfWinning(race[1], race[0]))
const solution1 = winningTimes.reduce((acc, curr) => acc * curr, 1)
console.log(solution1)

const input2 = [62737565, 644102312401023]

const solution2 = waysOfWinning(input2[1], input2[0])
console.log(solution2)
