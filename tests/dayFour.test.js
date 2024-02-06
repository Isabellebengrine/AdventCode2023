const {dayFourPartTwo, getInitialCardCounters,
    dayFourPartOne, getMatchNumber, getPointsFromMatches, getWinningNumbers, getMyNumbers, getAllNumbers} = require('../src/dayFour');



//day 4 part 2

test('Day4 Example Part Two returns 30', () => {
    expect(dayFourPartTwo(cards)
    ).toBe(30);
})

test('getInitialCardCounters returns cards with number = 1 to start for each', () => {
    expect(getInitialCardCounters(cards)
    ).toStrictEqual(cardCounters);
})

const cardCounters = {
    '1': 1,
    '2': 1,
    '3': 1,
    '4': 1,
    '5': 1,
    '6': 1
};

//day 4 part 1

const cards = [
    'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
    'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
    'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
    'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
    'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
    'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11'
];

test('Day4 Example Part One returns 13', () => {
    expect(dayFourPartOne(cards)
    ).toBe(13);
})

test('getWinningNumbers for card 1 returns card 1 winning numbers', () => {
    expect(getWinningNumbers('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53')
    ).toStrictEqual([41,48,83,86,17]);
})

test('getMyNumbers for card 1 returns card 1 numbers I have', () => {
    expect(getMyNumbers('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53')
    ).toStrictEqual([83,86,6,31,17,9,48,53]);
})

test('getAllNumbers for card 1 returns all card 1 numbers', () => {
    expect(getAllNumbers('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53')
    ).toStrictEqual(['41 48 83 86 17', '83 86  6 31 17  9 48 53']);
})

test('getMatchNumber returns 4 for card 1', () => {
    expect(getMatchNumber('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53')
    ).toBe(4);
})

test('getMatchNumber returns 0 for card 6', () => {
    expect(getMatchNumber('Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11')
    ).toBe(0);
})

test('getPointsFromMatches returns 8 for 4 matches', () => {
    expect(getPointsFromMatches(4)
    ).toBe(8);
})

test('getPointsFromMatches returns 0 for 0 matches', () => {
    expect(getPointsFromMatches(0)
    ).toBe(0);
})
