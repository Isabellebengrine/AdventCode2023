const {dayTwoPartTwo, getGamePower,
    dayTwoPartOne, checkIfGamePossible, getGameId, getResultArray, getPartialResultArray, getColor, getNumber} = require('../src/dayTwo');


//Day Two Part Two
test('DayTwo Example Part Two', () => {
    expect(dayTwoPartTwo([
            'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
            'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
            'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
            'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
            'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
        ])
    ).toBe(2286);
})

test('D2P2 get Game Power returns 48 for game 1', () => {
    expect(getGamePower('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')
    ).toBe(48);
})

test('D2P2 get Game Power returns 12 for game 2', () => {
    expect(getGamePower('Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue')
    ).toBe(12);
})

test('D2P2 get Game Power returns 1560 for game 3', () => {
    expect(getGamePower('Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red')
    ).toBe(1560);
})

test('D2P2 get Game Power returns 630 for game 4', () => {
    expect(getGamePower('Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red')
    ).toBe(630);
})

test('D2P2 get Game Power returns 36 for game 5', () => {
    expect(getGamePower('Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green')
    ).toBe(36);
})

//Day Two Part One
test('DayTwo Example Part One', () => {
    expect(dayTwoPartOne([
            'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
            'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
            'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
            'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
            'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
        ])
    ).toBe(8);
})

test('Day2 Part1 check if game is possible with 12 red, 13 green, and 14 blue returns true', () => {
    expect(checkIfGamePossible(
            'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
        )
    ).toBe(true);
})

test('Day2 Part1 check if game is possible with 12 red, 13 green, and 14 blue returns false', () => {
    expect(checkIfGamePossible(
            'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red'
        )
    ).toBe(false);
})

test('Day2 Part1 returns game Id', () => {
    expect(getGameId(
            'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
        )
    ).toBe(1);
})

test('Day2 Part1 returns result array', () => {
    expect(getResultArray(
            'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
        )
    ).toStrictEqual([
        '3 blue, 4 red',
        '1 red, 2 green, 6 blue',
        '2 green'
    ]);
})

test('Day2 Part1 returns partial result array', () => {
    expect(getPartialResultArray(
            '3 blue, 4 red'
        )
    ).toStrictEqual([
        '3 blue',
        '4 red'
    ]);
})

test('Day2 Part1 returns color', () => {
    expect(getColor(
            '3 blue'
        )
    ).toStrictEqual('blue');
})

test('Day2 Part1 returns number', () => {
    expect(getNumber(
            '3 blue'
        )
    ).toStrictEqual(3);
})

