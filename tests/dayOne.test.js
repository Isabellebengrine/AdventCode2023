const {dayOnePartOne, getCalibrationValue, lireFichierTexte,
    remplacerMotsParChiffres, dayOnePartTwo, findLastDigitFromEnd, findFirstDigitFromStart} = require('../src/dayOne');


//Day One :
test('Exemple D1 Part One', () => {
    expect(
        dayOnePartOne([
            '1abc2',
            'pqr3stu8vwx',
            'a1b2c3d4e5f',
            'treb7uchet',
        ])
    ).toBe(142);
});

test('Exemple D1 Part Two', () => {
    expect(
        dayOnePartTwo([
            'two1nine',
            'eightwothree',
            'abcone2threexyz',
            'xtwone3four',
            '4nineeightseven2',
            'zoneight234',
            '7pqrstsixteen',
        ])
    ).toBe(281);
});

test('getCalibrationValue on line example returns 15', () => {
    expect(
        getCalibrationValue('a1b2c3d4e5f')
    ).toBe(15);
});

test('getCalibrationValue on line example returns 77', () => {
    expect(
        getCalibrationValue('treb7uchet')
    ).toBe(77);
});


test('changes digit word to digit in chaine', () => {
    expect(
        remplacerMotsParChiffres('two1nine')
    ).toBe('219');
});

test('changes digit word to digit in chaine', () => {
    expect(
        remplacerMotsParChiffres('zoneight234')
    ).toBe('z1ight234');
});

test('changes digit word to digit in chaine', () => {
    expect(
        remplacerMotsParChiffres('eightwothree')
    ).toBe('8wo3');
});

test('changes digit word to digit in chaine', () => {
    expect(
        remplacerMotsParChiffres('abcone2threexyz')
    ).toBe('abc123xyz');
});

test('returns last digit from chaine', () => {
    expect(
        findLastDigitFromEnd('234zoneight')
    ).toBe(8);
});

test('returns last digit from chaine', () => {
    expect(
        findLastDigitFromEnd('4nineeightseven2')
    ).toBe(2);
});

test('returns first digit from chaine', () => {
    expect(
        findFirstDigitFromStart('xyztwone')
    ).toBe(2);
});

test('returns last digit from chaine', () => {
    expect(
        findLastDigitFromEnd('xyztwone')
    ).toBe(1);
});

test('returns first digit from chaine', () => {
    expect(
        findFirstDigitFromStart('abcone2threexyz')
    ).toBe(1);
});

test('returns first digit from chaine', () => {
    expect(
        findFirstDigitFromStart('4nineeightseven2')
    ).toBe(4);
});

test('changes digit word to digit in chaine', () => {
    expect(
        remplacerMotsParChiffres('4nineeightseven2')
    ).toBe('49872');
});

test('Fichier d\'exemple renvoie un tableau', () => {
    expect(
        lireFichierTexte('dayOne', 'inputPartOne.example.text')
    ).toStrictEqual([
        '1abc2\r', 'pqr3stu8vwx\r', 'a1b2c3d4e5f\r', 'treb7uchet\r'
    ])
});
