const { extraireGearAvecPosition, dayThreePartTwo, getAdjacentToExactlyTwoNumbers, extraireTousNombresFromRows,
    extraireTousAsteriskFromRows,
    dayThreePartOne, getRowsArray, extraireNombresAvecPosition, isSymbol, isSymbolBeforeNumber, isSymbolAfterNumber,
    isSymbolAboveNumber, isSymbolBelowNumber, addValues} = require('../src/dayThree');


const numbers = [
    { valeur: 467, ligne: 1, position: 0 },
    { valeur: 114, ligne: 1, position: 5 },
    { valeur: 35, ligne: 3, position: 2 },
    { valeur: 633, ligne: 3, position: 6 },
    { valeur: 617, ligne: 5, position: 0 },
    { valeur: 58, ligne: 6, position: 7 },
    { valeur: 592, ligne: 7, position: 2 },
    { valeur: 755, ligne: 8, position: 6 },
    { valeur: 664, ligne: 10, position: 1 },
    { valeur: 598, ligne: 10, position: 5 }
];

const gears = [
    { ligne: 2, position: 3 },
    { ligne: 5, position: 3 },
    { ligne: 9, position: 5 }
];


//Day 3 Part 1 - data :
const inputSample = {
    '1': '.....*....*........./227..-113........@...825/.....348...881......603...........%....793...=............235*..............472.........82.941\r',
  '2': '..360..432..997....................................*.....=............62...702......*..............................273..................*...\r',
  '3': '...........&.......833.489.......@.........176...895............503.......$.......493...............929...............*.302....492.526......\r',
  '4': '....................*.....+....85.......................601............................................*386......*...96...........*....*613.\r',
  '5': '.....650.360+...#..589..............................221*..............927...........941..404..+669..............823.................360.....\r'
}

const rows = {
    '1': '467..114..\r',
  '2': '...*......\r',
  '3': '..35..633.\r',
  '4': '......#...\r',
  '5': '617*......\r',
  '6': '.....+.58.\r',
  '7': '..592.....\r',
  '8': '......755.\r',
  '9': '...$.*....\r',
  '10': '.664.598..\r'
};

const modifiedRows = {
    '1': '467..114..',
    '2': '...*......',
    '3': '.#35..6339',
    '4': '......#...',
    '5': '617*......',
    '6': '.....+.58.',
    '7': '..592.....',
    '8': '......755.',
    '9': '...$.*....',
    '10': '.664.598..'
};

const valuesArray = [
    { valeur: 467, ligne: 1, position: 0 },
    { valeur: 35, ligne: 3, position: 2 },
    { valeur: 633, ligne: 3, position: 6 }
];


//day3 part 2
test('DayThree Example Part two returns 467835', () => {
    expect(dayThreePartTwo(rows)
    ).toBe(467835);
})

test('extraire tous les nbs de ensemble de lignes', () => {
    expect(
        extraireTousNombresFromRows(rows)
    ).toStrictEqual(numbers)
});

test('extraire tous les * de ensemble de lignes', () => {
    expect(
        extraireTousAsteriskFromRows(rows)
    ).toStrictEqual(gears)
});

test('extraireGearAvecPosition returns all * on one row', () => {
    expect(extraireGearAvecPosition('...*......', 2)
    ).toStrictEqual(
        [
            { ligne: 2, position: 3 },
        ]
    );
})

test('isAdjacentToExactlyTwoNumbers returns only two gear data sets', () => {
    expect(getAdjacentToExactlyTwoNumbers({ '2-3': [ 467, 35 ], '5-3': [ 617 ], '9-5': [ 755, 598 ] })
    ).toStrictEqual([ [ 467, 35 ], [ 755, 598 ] ]);
})



//day 3 part 1

test('extraire nbs de ligne avec position et numero de ligne', () => {
    expect(
        extraireNombresAvecPosition('.....*....*........./227..-113........@...825/.....348...881......603...........%....793...=............235*..............472.........82.941', 1)
    ).toStrictEqual([
            { valeur: 227, ligne: 1, position: 21 },
            { valeur: 113, ligne: 1, position: 27 },
            { valeur: 825, ligne: 1, position: 42 },
            { valeur: 348, ligne: 1, position: 51 },
            { valeur: 881, ligne: 1, position: 57 },
            { valeur: 603, ligne: 1, position: 66 },
            { valeur: 793, ligne: 1, position: 85 },
            { valeur: 235, ligne: 1, position: 104 },
            { valeur: 472, ligne: 1, position: 122 },
            { valeur: 82, ligne: 1, position: 134 },
            { valeur: 941, ligne: 1, position: 137 }
        ]
    )
});

test('DayThree Example Part One returns ', () => {
    expect(dayThreePartOne(rows)
    ).toBe(4361);
})

test('addValues returns 1135 to add 467, 35 and 633', () => {
    expect(addValues(valuesArray)
    ).toBe(1135);
})

test('Fichier d\'exemple renvoie un tableau associatif de rows', () => {
    expect(
        getRowsArray('dayThree', 'inputPartOne.example.text')
    ).toStrictEqual(rows)
});

test('Fichier input sample renvoie tableau associatif de rows inputSample', () => {
    expect(
        getRowsArray('dayThree', 'inputSample.example.text')
    ).toStrictEqual(inputSample)
});

test('extraire nbs de ligne avec position et numero de ligne', () => {
    expect(
        extraireNombresAvecPosition('467..114..', 1)
    ).toStrictEqual([
            { valeur: 467, ligne: 1, position: 0 },
            { valeur: 114, ligne: 1, position: 5 }
        ]
    )
});

test('isSymbol returns false for point', () => {
    expect(
        isSymbol('.')
    ).toStrictEqual(false
    )
});

test('isSymbol returns true for symbol', () => {
    expect(
        isSymbol('#')
    ).toStrictEqual(true
    )
});

test('isSymbolBeforeNumber returns false for number in position 0', () => {
    expect(
        isSymbolBeforeNumber(
            { valeur: 467, ligne: 1, position: 0 }, rows
        )
    ).toStrictEqual(false
    )
});

test('isSymbolBeforeNumber returns false for number not in position 0 and not after symbol', () => {
    expect(
        isSymbolBeforeNumber({ valeur: 35, ligne: 3, position: 2 }, rows)
    ).toStrictEqual(false
    )
});

test('isSymbolBeforeNumber returns true for number not in position 0 and after symbol', () => {
    expect(
        isSymbolBeforeNumber({ valeur: 35, ligne: 3, position: 2 }, modifiedRows)
    ).toStrictEqual(true
    )
});

test('isSymbolAfterNumber returns false for number in last position', () => {
    expect(
        isSymbolAfterNumber(
            { valeur: 6339, ligne: 3, position: 6 }, modifiedRows
        )
    ).toStrictEqual(false
    )
});

test('isSymbolAfterNumber returns false for number not in last position and not before symbol', () => {
    expect(
        isSymbolAfterNumber(
            { valeur: 633, ligne: 3, position: 6 }, rows
        )
    ).toStrictEqual(false
    )
});

test('isSymbolAfterNumber returns true for number not in last position and before symbol', () => {
    expect(
        isSymbolAfterNumber(
            { valeur: 617, ligne: 5, position: 0 }, rows
        )
    ).toStrictEqual(true
    )
});

test('isSymbolAboveNumber returns false for number in first row', () => {
    expect(
        isSymbolAboveNumber(
            { valeur: 467, ligne: 1, position: 0 }, rows
        )
    ).toStrictEqual(false
    )
});

test('isSymbolAboveNumber returns false for number not in first row that is not below a symbol', () => {
    expect(
        isSymbolAboveNumber(
            { valeur: 58, ligne: 6, position: 7 }, rows
        )
    ).toStrictEqual(false
    )
});

test('isSymbolAboveNumber returns true for number not in first row that is below a symbol', () => {
    expect(
        isSymbolAboveNumber(
            { valeur: 592, ligne: 7, position: 2 }, rows
        )
    ).toStrictEqual(true
    )
});

test('isSymbolBelowNumber returns false for number in last row', () => {
    expect(
        isSymbolBelowNumber(
            { valeur: 664, ligne: 10, position: 1 }, rows
        )
    ).toStrictEqual(false
    )
});

test('isSymbolBelowNumber returns false for number not in last row that is not above a symbol', () => {
    expect(
        isSymbolBelowNumber(
            { valeur: 58, ligne: 6, position: 7 }, rows
        )
    ).toStrictEqual(false
    )
});

test('isSymbolBelowNumber returns true for number not in last row that is above a symbol', () => {
    expect(
        isSymbolBelowNumber(
            { valeur: 755, ligne: 8, position: 6 }, rows
        )
    ).toStrictEqual(true
    )
});
