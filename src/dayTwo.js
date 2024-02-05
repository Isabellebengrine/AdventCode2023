//day 2

const fs = require("fs");

const {lireFichierTexte} = require('../src/dayOne');

const data = lireFichierTexte('dayTwo', 'inputPartOne.example.text');
console.log('day 2 (test): ', dayTwoPartOne(data))
//
const vraiData = lireFichierTexte('dayTwo', 'input.text');
console.log('day 2 (vrai): ', dayTwoPartOne(vraiData))

function dayTwoPartTwo(data) {
    let sum = 0;
    for (let game of data) {
        let power = getGamePower(game);
        sum += power ;
    }
    return sum;
}

function getGamePower(game) {
    let arr = getResultArray(game);
    let maxBlue = 0;
    let maxRed = 0;
    let maxGreen = 0;

    for (let part of arr) {
        const partialArr = getPartialResultArray(part)
        for (const element of partialArr) {
            const color = getColor(element);
            const number = getNumber(element);
            switch (color) {
                case 'red':
                    maxRed = maxRed <= number ? number : maxRed;
                    break;
                case 'blue':
                    maxBlue = maxBlue <= number ? number : maxBlue;
                    break
                case 'green':
                    maxGreen = maxGreen <= number ? number : maxGreen;
                    break
            }
        }
    }

    return maxBlue * maxRed * maxGreen;
}

function dayTwoPartOne(data) {
    let sum = 0;
    for (let string of data) {
        let nb = checkIfGamePossible(string) ? getGameId(string) : 0;
        sum += nb ;
    }
    return sum;
}

function getGameId(game) {
    let arr = game.split(':');
    let gameid = arr[0].split(' ');

    return parseInt(gameid[1]);
}

//pour game : 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
function getResultArray(game) {
    let resArray = game.split(':').pop();
    let arr = resArray.split(';').map(str => str.trimStart());
    return arr;
}

//example : '3 blue, 4 red'
function getPartialResultArray(sample) {
    return sample.split(',').map(str => str.trimStart());
}

//example : '3 blue'
function getColor(test) {
    const arr = test.split(" ");
    return arr[1];
}

function getNumber(test) {
    const arr = test.split(" ");
    return parseInt(arr[0]);
}

function checkIfGamePossible(string) {

    let test = true;
    let arr = getResultArray(string);

    for (let part of arr) {
        const partialArr = getPartialResultArray(part)
        for (const element of partialArr) {
            if (test === false) {
                break;
            }
            const color = getColor(element);
            const number = getNumber(element);
            switch (color) {
                case 'red':
                    test = number <= 12;
                    break;
                case 'blue':
                    test = number <= 14;
                    break
                case 'green':
                    test = number <= 13;
                    break
            }
        }
    }

    return test;
}

module.exports = {dayTwoPartOne, dayTwoPartTwo, checkIfGamePossible, getNumber, getColor, getPartialResultArray, getResultArray, getGameId, getGamePower};
