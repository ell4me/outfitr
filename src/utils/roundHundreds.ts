export const roundHundreds = (maxY: number) => {
    const decimal = Math.round(maxY).toString().length - 1
    let numberOfZero = ''
    for(let i=0; i < decimal; i++) {
        numberOfZero += '0'
    }
    const hundredths = Number(('1' + numberOfZero))
    const maxYRound = Math.ceil(maxY/hundredths) * hundredths
    return {maxYRound, hundredths}
}
