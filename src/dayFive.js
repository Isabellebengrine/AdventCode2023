//imports
const fs = require("fs");

const {lireFichierTexte} = require('../src/dayOne');

const vraiData = lireFichierTexte('dayFive', 'inputPartOne.example.text');


//solution from : https://github.com/ccozad/advent-of-code/blob/master/day-5.js :
const inputs = {
    seedToSoil: [],
    soilToFertilizer: [],
    fertilizerToWater: [],
    waterToLight: [],
    lightToTemperature: [],
    temperatureToHumidity: [],
    humidityToLocation: [],
}

const maps = {
    seedToSoil: [],
    soilToFertilizer: [],
    fertilizerToWater: [],
    waterToLight: [],
    lightToTemperature: [],
    temperatureToHumidity: [],
    humidityToLocation: [],
}

function processInputs(inputs, map) {
    for( let i = 0; i < inputs.length; i++) {
        let parts = inputs[i].split(" ").map(Number);
        let destStart = parts[0];
        let sourceStart = parts[1];
        let rangeLength = parts[2];

        map.push({ destStart: destStart, sourceStart: sourceStart, rangeLength: rangeLength});
    }
}

function mapValue(source, map) {
    let dest = source;
    for(let i = 0; i < map.length; i++) {
        let range = map[i];
        if (source >= range.sourceStart && source < range.sourceStart + range.rangeLength) {
            dest = range.destStart + (source - range.sourceStart);
            break;
        }
    }

    return dest;
}


function seedToLocation(seed, maps) {
    let soil, fertilizer, water, light, temperature, humidity, location;

    soil = mapValue(seed, maps.seedToSoil);
    fertilizer = mapValue(soil, maps.soilToFertilizer);
    water = mapValue(fertilizer, maps.fertilizerToWater);
    light = mapValue(water, maps.waterToLight);
    temperature = mapValue(light, maps.lightToTemperature);
    humidity = mapValue(temperature, maps.temperatureToHumidity);
    location = mapValue(humidity, maps.humidityToLocation);

    return location;
}

let activeInput = null;
for (let i = 0; i < vraiData.length; i++) {
    if(vraiData[i].length == 0) {
        continue;
    }

    if (vraiData[i].startsWith("seeds: ")) {
        inputs.seed = vraiData[i].substring(7).split(" ").map(Number);
    } else if (vraiData[i].startsWith("seed-to-soil")) {
        activeInput = "seedToSoil";
    } else if (vraiData[i].startsWith("soil-to-fertilizer")) {
        activeInput = "soilToFertilizer";
    } else if (vraiData[i].startsWith("fertilizer-to-water")) {
        activeInput = "fertilizerToWater";
    } else if (vraiData[i].startsWith("water-to-light")) {
        activeInput = "waterToLight";
    } else if (vraiData[i].startsWith("light-to-temperature")) {
        activeInput = "lightToTemperature";
    } else if (vraiData[i].startsWith("temperature-to-humidity")) {
        activeInput = "temperatureToHumidity";
    } else if (vraiData[i].startsWith("humidity-to-location")) {
        activeInput = "humidityToLocation";
    } else {
        inputs[activeInput].push(vraiData[i]);
    }
}

processInputs(inputs.seedToSoil, maps.seedToSoil);
processInputs(inputs.soilToFertilizer, maps.soilToFertilizer);
processInputs(inputs.fertilizerToWater, maps.fertilizerToWater);
processInputs(inputs.waterToLight, maps.waterToLight);
processInputs(inputs.lightToTemperature, maps.lightToTemperature);
processInputs(inputs.temperatureToHumidity, maps.temperatureToHumidity);
processInputs(inputs.humidityToLocation, maps.humidityToLocation);

const locations = [];
for(let i = 0; i < inputs.seed.length; i++) {
    locations.push(seedToLocation(inputs.seed[i], maps));
}

let min = Number.MAX_SAFE_INTEGER;
for(let i = 0; i < locations.length; i++) {
    if (locations[i] < min) {
        min = locations[i];
    }
}

//console.log(`Part 1 min distance: ${min}`);


let seeds = maps.seedToSoil
    .sort((a, b) => a.sourceStart - b.sourceStart)
    .map(x => (
        {
            start: x.sourceStart,
            end: x.sourceStart + x.rangeLength,
            startLocation: seedToLocation(x.sourceStart, maps),
            endLocation: seedToLocation(x.sourceStart + x.rangeLength, maps)
        }
    ));

//console.log('.... seeds ....')
//console.log(seeds)
//donne : calcul seedToLocation pour chaque source start et source end + 1
//     [
//     { start: 50, end: 98, startLocation: 20, endLocation: 67 },
//         { start: 98, end: 100, startLocation: 67, endLocation: 100 }
//     ]


part2Min = Number.MAX_SAFE_INTEGER;
//console.log(inputs)
//donne
// {
//     seedToSoil: [ '50 98 2', '52 50 48' ],
//         soilToFertilizer: [ '0 15 37', '37 52 2', '39 0 15' ],
//     fertilizerToWater: [ '49 53 8', '0 11 42', '42 0 7', '57 7 4' ],
//     waterToLight: [ '88 18 7', '18 25 70' ],
//     lightToTemperature: [ '45 77 23', '81 45 19', '68 64 13' ],
//     temperatureToHumidity: [ '0 69 1', '1 0 69' ],
//     humidityToLocation: [ '60 56 37', '56 93 4' ],
//     seed: [ 79, 14, 55, 13 ]
// }
//donc inputs.seed = [ 79, 14, 55, 13 ] :
for(let i = 0; i < inputs.seed.length; i+=2) {
    let start = inputs.seed[i];
    let end = start + inputs.seed[i + 1] - 1;
    let location = Number.MAX_SAFE_INTEGER;

    //console.log(`Evaluating range [${start}, ${end}]`);

    for(let j = 0; j < seeds.length; j++) {
        let overlap = Math.min(end, seeds[j].end) - Math.max(start, seeds[j].start);
        //console.log('??? overlap ???')
        //console.log(overlap)
        if (overlap >= 0) {
            // Ranges over lap
            let overLapStart = start >= seeds[j].start ? start : seeds[j].start;
            let overLapEnd = end <= seeds[j].end ? end : seeds[j].end;

            for(let k = overLapStart; k <= overLapEnd; k++) {
                location= seedToLocation(k, maps);
                if(location < part2Min) {
                    part2Min = location;
                }
            }

            break;
        }
    }
}

//console.log(`Part 2 min distance: ${part2Min}`);

function mySeedToLocation(seed, maps) {
    let oldNb = seed;
    maps.forEach(map => {
        let ruleToApply = findWhichRuleAppliesToNumber(oldNb, map);
        if (null !== ruleToApply) {
            let ruleObj = convertRuleStringToParametersArray(ruleToApply);
            oldNb = getNewValueWithRule(ruleObj, oldNb);
        }
    })
    return oldNb;
}
// let mapsArray = vraiData.slice(1);
// let maps = extractMaps(mapsArray);
// let test = mySeedToLocation(79, maps)
// console.log(test)

function sortRules(map) {
    const sortedMap = { name: map.name };

    const rules = Object.keys(map)
        .filter(key => key.startsWith('rule'))
        .map(key => ({ key, values: convertRuleStringToParametersArray(map[key]) }))
        .sort((a, b) => a.values.sourceStart - b.values.sourceStart);

    rules.forEach((rule, index) => {
        sortedMap[`rule${index + 1}`] = rule.values;
    });

    return sortedMap;
}

//console.log(dayFivePartOne(vraiData))



//day 5 part 2



// Exemple d'utilisation from input.text
//const seedPairs = [{ start: 487758422, length: 524336848 }];


function extractSeedRanges(seedsString) {
    const ranges = [];
    const seedsPattern = /(\d+) (\d+)/g;
    let match;

    while ((match = seedsPattern.exec(seedsString)) !== null) {
        const start = parseInt(match[1], 10);
        const end = start + parseInt(match[2], 10) - 1;
        ranges.push({ start, end });
    }

    return ranges;
}

function dayFivePartTwo(vraiData) {
    const seedsString = vraiData[0];
    const seedPairs = extractSeedRanges(seedsString);
    let mapsArray = vraiData.slice(1);
    let maps = extractMaps(mapsArray);
    let locationsArray = [];
    for (const range of seedPairs) {
        let start = range.start;
        maps.forEach(map => {
            let convertedRange = convertRangeForMap(range, map);
            // if (null !== ruleToApply) {
            //     let ruleObj = convertRuleStringToParametersArray(ruleToApply);
            //     oldNb = getNewValueWithRule(ruleObj, oldNb);
            // }
        })
        //locationsArray.push(oldNb);
    }
    //console.log(seedPairs)
    //return getMinimumForSeedPairs(seedPairs, vraiData);
}

function convertRangeForMap(range, map) {
    let start= range.start;
    let end = range.end;
    let result = null;
    let locations = [];
    for (const key in map) {
        if (key.startsWith('rule')) {
            const params = convertRuleStringToParametersArray(map[key])
            //does rule apply to range start ?
            let rangeStartAfterSourceStart = start >= params.sourceStart;
            let rangeStartBeforeSourceEnd = start <= params.sourceStart + params.length -1;
            let yesOnRangeStart = rangeStartAfterSourceStart && rangeStartBeforeSourceEnd;

            //does rule apply to range end ?
            let rangeEndAfterSourceStart = end >= params.sourceStart;
            let rangeEndBeforeSourceEnd = end <= params.sourceStart + params.length -1;
            let yesOnRangeEnd = rangeEndAfterSourceStart && rangeEndBeforeSourceEnd;

            if (yesOnRangeStart && yesOnRangeEnd) {
                //applies on both : apply rule on start and end of range :
                const start = getNewValueWithRule(params, start);
                const end = getNewValueWithRule(params, end);
                ranges.push({ start, end });

            } else if (yesOnRangeStart && !yesOnRangeEnd) {//means range end is after source end so
                //apply rule only from range start until rule end
                //and test rules on new range from rule end +1 until range end
            } else if (!yesOnRangeStart) {
                if (rangeStartAfterSourceStart) {
                    //means range start is after rule end so rule does not apply
                    result = null;
                } else if (!rangeStartAfterSourceStart) {
                    if (!rangeEndAfterSourceStart) {
                        return null;
                    } else if (rangeEndBeforeSourceEnd) {
                        //apply rule from rule start to range end
                        //no rule from range start to rule start -1 ?
                    } else {
                        //apply rule from rule start to rule end
                        //what about range from range start to rule start -1
                        //or range from rule end +1 to range end ? not sure
                    }
                }
            }
            //console.log(`Rule ${ruleNumber}: ${ruleValue}`, params);
        }
    }
    return ranges;
}

function getMinimumForSeeds(seeds, vraiData) {
    const mapsArray = vraiData.slice(1);
    const maps = extractMaps(mapsArray);
    const locationsArray = [];
    for (const seed of seedsArray) {
        let oldNb = seed;
        maps.forEach(map => {
            let ruleToApply = findWhichRuleAppliesToNumber(oldNb, map);
            if (null !== ruleToApply) {
                let ruleObj = convertRuleStringToParametersArray(ruleToApply);
                oldNb = getNewValueWithRule(ruleObj, oldNb);
            }
        })
        locationsArray.push(oldNb);
    }

    return Math.min(...locationsArray);
}

function getMinimumForSeedPairs(pairs, vraiData) {
    const mapsArray = vraiData.slice(1);
    const maps = extractMaps(mapsArray);
    const pairMin = [];

    for (const pair of pairs) {
        //console.log(pair, pair.start, pair.length)
        for (let i = pair.start; i < pair.start + pair.length; i++) {
            let oldNb = i;
            let location = oldNb;
            //console.log('i ? ' + i)
            maps.forEach(map => {
                let ruleToApply = findWhichRuleAppliesToNumber(oldNb, map);
                // console.log('==== ruleToApply ====')
                // console.log(ruleToApply)
                if (null !== ruleToApply) {
                    let ruleObj = convertRuleStringToParametersArray(ruleToApply);
                    oldNb = getNewValueWithRule(ruleObj, oldNb);
                    //console.log('new nb ? ' + oldNb)
                }
            })
            //location = oldNb;
            // let minLocation = location;
            // minLocation = location >= minLocation ? minLocation : location;
            //console.log('==== i ====' + i)
            //console.log('==== location ====' + oldNb)
            // console.log(minLocation)
            // pairMin.push(minLocation);
        }
    }

    return Math.min(...pairMin);
}

//day 5 part 1
function getInitialSeedsArray(partFiveData) {
    let seedString = partFiveData[0];
    let numbers = seedString.split(':').pop().trim();

    return numbers.split(/\s+/).map(Number);
}

function dayFivePartOne(vraiData) {
    let seedsArray = getInitialSeedsArray(vraiData)
    let mapsArray = vraiData.slice(1);
    let maps = extractMaps(mapsArray);
    let locationsArray = [];
    for (const seed of seedsArray) {
        let location = seedToLocation(seed, maps);
        locationsArray.push(location);
    }

    return Math.min(...locationsArray);
}

function extractMaps(data) {
    const maps = [];
    let currentMap = {};
    let ruleCount = 1;

    for (const line of data) {
        if (!line.match(/\d/)) {
            // Si la ligne ne contient pas de chiffres, c'est une nouvelle "name"
            if (currentMap !== {}) {
                maps.push(currentMap);
            }
            const name = line.replace(':', '').trim();
            currentMap = { name };
            ruleCount = 1;
        } else {
            // Sinon, c'est une ligne avec des nombres, l'ajouter à la règle actuelle
            const ruleName = `rule${ruleCount}`;
            currentMap[ruleName] = line.trim();
            ruleCount++;
        }
    }

    // Ajouter la dernière map si elle existe
    if (currentMap !== {}) {
        maps.push(currentMap);
    }

    return maps.filter(map => Object.keys(map).length > 1);
}

function findWhichRuleAppliesToNumber(number, map) {
    let result = null;
    for (const key in map) {
        if (key.startsWith('rule')) {
            const params = convertRuleStringToParametersArray(map[key])
            if (number >= params.sourceStart && number <= params.sourceStart + params.length -1) {
                result = map[key];
            }
            //console.log(`Rule ${ruleNumber}: ${ruleValue}`, params);
        }
    }
    return result;
}

function getNewValueWithRule(ruleObject, number) {
    return number + ruleObject.destinationStart - ruleObject.sourceStart;
}

function convertRuleStringToParametersArray(ruleValue) {
    const ruleNumbers = ruleValue.split(' ').map(Number);
    const [destinationStart, sourceStart, length] = ruleNumbers;

    return { destinationStart, sourceStart, length };
}

module.exports = {extractSeedRanges, dayFivePartTwo, convertRangeForMap, sortRules,
    dayFivePartOne, getInitialSeedsArray, findWhichRuleAppliesToNumber, convertRuleStringToParametersArray,
    getNewValueWithRule, extractMaps};
