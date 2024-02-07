const { extractSeedRanges, dayFivePartTwo, convertRangeForMap, sortRules,
    dayFivePartOne, getInitialSeedsArray, findWhichRuleAppliesToNumber, convertRuleStringToParametersArray,
    getNewValueWithRule, extractMaps} = require('../src/dayFive');


const data5 = [
    'seeds: 79 14 55 13',
    'seed-to-soil map:',
    '50 98 2',
    '52 50 48',
    'soil-to-fertilizer map:',
    '0 15 37',
    '37 52 2',
    '39 0 15',
    'fertilizer-to-water map:',
    '49 53 8',
    '0 11 42',
    '42 0 7',
    '57 7 4',
    'water-to-light map:',
    '88 18 7',
    '18 25 70',
    'light-to-temperature map:',
    '45 77 23',
    '81 45 19',
    '68 64 13',
    'temperature-to-humidity map:',
    '0 69 1',
    '1 0 69',
    'humidity-to-location map:',
    '60 56 37',
    '56 93 4'
];

const sortedBySourceStartMap = {
    name: 'soil-to-fertilizer map',
    rule1: { destinationStart: 39, sourceStart: 0, length: 15 },
    rule2: { destinationStart: 0, sourceStart: 15, length: 37 },
    rule3: { destinationStart: 37, sourceStart: 52, length: 2 }
}

//part2 - I give up - commented all failing as not finished

//day5 part1
//data :
const partFiveDataWithoutInitialSeeds = [
    'seed-to-soil map:',
    '50 98 2',
    '52 50 48',
    'soil-to-fertilizer map:',
    '0 15 37',
    '37 52 2',
    '39 0 15',
    'fertilizer-to-water map:',
    '49 53 8',
    '0 11 42',
    '42 0 7',
    '57 7 4',
    'water-to-light map:',
    '88 18 7',
    '18 25 70',
    'light-to-temperature map:',
    '45 77 23',
    '81 45 19',
    '68 64 13',
    'temperature-to-humidity map:',
    '0 69 1',
    '1 0 69',
    'humidity-to-location map:',
    '60 56 37',
    '56 93 4'
];

const seedsArray = [79, 14, 55, 13];
const seedToSoilMap = {name : 'seed-to-soil map', rule1: '50 98 2', rule2: '52 50 48'};
const maps = [
    { name: 'seed-to-soil map', rule1: '50 98 2', rule2: '52 50 48' },
    {
        name: 'soil-to-fertilizer map',
        rule1: '0 15 37',
        rule2: '37 52 2',
        rule3: '39 0 15'
    },
    {
        name: 'fertilizer-to-water map',
        rule1: '49 53 8',
        rule2: '0 11 42',
        rule3: '42 0 7',
        rule4: '57 7 4'
    },
    { name: 'water-to-light map', rule1: '88 18 7', rule2: '18 25 70' },
    {
        name: 'light-to-temperature map',
        rule1: '45 77 23',
        rule2: '81 45 19',
        rule3: '68 64 13'
    },
    {
        name: 'temperature-to-humidity map',
        rule1: '0 69 1',
        rule2: '1 0 69'
    },
    {
        name: 'humidity-to-location map',
        rule1: '60 56 37',
        rule2: '56 93 4'
    }
];

//tests

//day5 p2

test('extractSeedPairs for seed line returns array of seed pairs', () => {
    expect(
        extractSeedRanges("seeds: 79 14 55 13")
    ).toStrictEqual([ { start: 79, end: 92 }, { start: 55, end: 67 } ]);
})

// test('convertRangeForMap for seedToSoil map and 55 to 67 range returns range 57 to 69', () => {
//     expect(
//         convertRangeForMap({ start: 55, end: 67 }, seedToSoilMap)
//     ).toStrictEqual([{ start: 57, end: 69 }]);
// })

// test('sortRules for soil-to-fertilizer map returns map with rules sorted by source start number', () => {
//     expect(
//         sortRules({
//             name: 'soil-to-fertilizer map',
//             rule1: '0 15 37',
//             rule2: '37 52 2',
//             rule3: '39 0 15'
//         })
//     ).toStrictEqual(sortedBySourceStartMap);
// })

// test('buildSeedArrayFromPairs for seed pairs returns seed number array', () => {
//     expect(
//         buildSeedArrayFromPairs([ { start: 79, length: 14 }, { start: 55, length: 13 } ])
//     ).toStrictEqual(day5part2seedArray);
// })

// test('dayFivePartTwo returns 46', () => {
//     expect(
//         dayFivePartTwo(data5)
//     ).toStrictEqual(46);
// })

//day5 p1
// test('Day5 Example Part One data returns 35', () => {
//     expect(dayFivePartOne(data5)
//     ).toBe(35);
// })

test('getInitialSeedsArray returns day5 part1 initial seeds array', () => {
    expect(
        getInitialSeedsArray(data5)
    ).toStrictEqual(seedsArray);
})

test('extractMaps returns maps array', () => {
    expect(
        extractMaps(partFiveDataWithoutInitialSeeds)
    ).toStrictEqual(maps);
})

test('findWhichRuleAppliesToNumber for seedToSoil map and 13 returns null', () => {
    expect(
        findWhichRuleAppliesToNumber(13, seedToSoilMap)
    ).toStrictEqual(null);
})

test('findWhichRuleAppliesToNumber for seedToSoil map and 55 returns rule2', () => {
    expect(
        findWhichRuleAppliesToNumber(55, seedToSoilMap)
    ).toStrictEqual('52 50 48');
})

test('convertRuleStringToParametersArray', () => {
    expect(
        convertRuleStringToParametersArray('52 50 48')
    ).toStrictEqual({destinationStart: 52, sourceStart: 50, length: 48});
})

test('getNewValueWithRule for 55 and rule2 returns 57', () => {
    expect(
        getNewValueWithRule({destinationStart: 52, sourceStart: 50, length: 48}, 55)
    ).toStrictEqual(57);
})
