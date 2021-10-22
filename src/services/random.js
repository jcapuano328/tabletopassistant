import range from './range'

const randomBetween = (low, high) => {
    return Math.floor(Math.random()*(high-low+1)) + low;
}

module.exports = {
    randomBetween: randomBetween,
    randomRange(low, high, repeat = 1) {
        return range(repeat).map(r => randomBetween(low,high));
    },
    randomOneOf(list) {    
        return list[randomBetween(0, list.length-1)]; 
    }
};