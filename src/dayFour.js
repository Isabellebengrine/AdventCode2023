//imports
const fs = require("fs");

const {lireFichierTexte} = require('../src/dayOne');

//day 4 part 2

//test 07/12 donne 1243666 - too low
//pb : Card   1 trois espaces entre Card et number !!!
function getInitialCardCounters(cards) {
    const cardCounters = {};
    for (const card of cards) {
        let cardId = getCardId(card);
        cardCounters[cardId] = 1;
    }

    return cardCounters;
}

function dayFourPartTwo(cards) {
    let counter = getInitialCardCounters(cards);
    for (const card of cards) {
        let cardNb = counter[getCardId(card)]
        for (let j = 1; j <= cardNb; j++) {
            let matches = getMatchNumber(card);
            if (matches > 0) {
                let min = getCardId(card) + 1;
                let max = getCardId(card) + matches;
                for (let i = min; i <= max; i++) {
                    counter[i] += 1;
                }
            }
        }
    }

    return Object.values(counter).reduce((total, value) => total + value, 0);
}

function getCardId(card) {
    let arr = card.split(':');
    //enlever tous les espaces (peut y en avoir plusieurs)
    let id = arr[0].split(/\s+/);

    return parseInt(id[1]);
}


//day 4 part 1

function dayFourPartOne(cards) {
    let sum = 0;
    for (const card of cards) {
        let matches = getMatchNumber(card);
        let points = getPointsFromMatches(matches);
        sum += points;
    }

    return sum;
}

function getMatchNumber(card) {
    let winningNbs = getWinningNumbers(card);
    let myNbs = getMyNumbers(card);
    for (let myNb of myNbs) {
        myNb = parseInt(myNb);
    }
    let matches = winningNbs.filter(nombre => myNbs.includes(nombre));

    return matches.length;
}

function getPointsFromMatches(matchNumber) {
    return matchNumber === 0 ? 0 :  Math.pow(2, matchNumber - 1);
}

function getMyNumbers(cardString) {
    let split = getAllNumbers(cardString);

    return split[1].split(/\s+/).map(Number);
}

function getWinningNumbers(cardString) {
    let split = getAllNumbers(cardString);

    //regexp pour enlever tous les espaces si y en a plusieurs :
    return split[0].split(/\s+/).map(Number);
}

function getAllNumbers(cardString) {
    let numbersArray = cardString.split(':').pop();

    return numbersArray.split('|').map(str => str.trim());
}

module.exports = {dayFourPartTwo, getInitialCardCounters,
    dayFourPartOne, getMatchNumber, getPointsFromMatches, getWinningNumbers, getMyNumbers, getAllNumbers};
