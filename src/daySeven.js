//day 7

const fs = require("fs");

const {lireFichierTexte} = require('../src/dayOne');

const handTypesOrder = [
    'HighCard',
    'OnePair',
    'TwoPair',
    'ThreeOfAKind',
    'FullHouse',
    'FourOfAKind',
    'FiveOfAKind',
];

const data = lireFichierTexte('daySeven', 'input.text');
//console.log(data)
//console.log(getWinningHand('T55J5 684', 'QQQJA 483'))
//console.log(getWinningHandWithJokerRule('T55J5 684', 'KTJJT 220'));

function compareCards(card1, card2) {
    const cardOrder = "AKQJT98765432";
    return cardOrder.indexOf(card2) === cardOrder.indexOf(card1) ? 0 :
        (cardOrder.indexOf(card2) < cardOrder.indexOf(card1) ? card2 : card1);
}

function compareCardsWithJokerRule(card1, card2) {
    const cardOrder = "AKQT98765432J";
    return cardOrder.indexOf(card2) === cardOrder.indexOf(card1) ? 0 :
        (cardOrder.indexOf(card2) < cardOrder.indexOf(card1) ? card2 : card1);
}

function getWinningHand(hand1, hand2) {
    if (handTypesOrder.indexOf(getHandType(hand1)) !== handTypesOrder.indexOf(getHandType(hand2))) {
        return handTypesOrder.indexOf(getHandType(hand1)) < handTypesOrder.indexOf(getHandType(hand2)) ? hand2 : hand1
    } else {
        for (let i = 0; i < 5; i++) {
            const result = compareCards(hand2[i], hand1[i]);
            if (result !== 0) {
                return result === hand1[i] ? hand1 : hand2;
            }
        }
    }
}

function getWinningHandWithJokerRule(hand1, hand2) {
    if (handTypesOrder.indexOf(getHandTypeWithJokerRule(hand1)) !== handTypesOrder.indexOf(getHandTypeWithJokerRule(hand2))) {
        return handTypesOrder.indexOf(getHandTypeWithJokerRule(hand1)) < handTypesOrder.indexOf(getHandTypeWithJokerRule(hand2)) ? hand2 : hand1
    } else {
        for (let i = 0; i < 5; i++) {
            const result = compareCardsWithJokerRule(hand2[i], hand1[i]);
            if (result !== 0) {
                return result === hand1[i] ? hand1 : hand2;
            }
        }
    }
}

function getTotalWinningsWithJokerRule(hands) {
    const sortedHands = getSortedHandsWithJokerRule(hands)
        .map(item => ({ hand: item.split(' ')[0], bid: parseInt(item.split(' ')[1]) }));

    let totalWinnings = 0;
    for (let i = 0; i < sortedHands.length; i++) {
        totalWinnings += sortedHands[i].bid * (i + 1);
    }

    return totalWinnings;
}

function getHandTypeWithJokerRule(hand) {
    const cardCounts = { 'J': 0 };
    const cards = hand.split(' ')[0];

    for (const card of cards) {
        if (card === 'J') {
            cardCounts['J']++;
        } else {
            if (cardCounts[card]) {
                cardCounts[card]++;
            } else {
                cardCounts[card] = 1;
            }
        }
    }
    // console.log('cardcounts : ', cardCounts)
    // console.log('nb de j ? ', cardCounts.J)
    const uniqueCounts = new Set(Object.values(cardCounts));
    const countOfTwos = Object.values(cardCounts).filter(count => count === 2).length;

    // console.log('uniqueCounts :', uniqueCounts)
    // console.log('countOfTwos :', countOfTwos)

    if (uniqueCounts.has(5)) {
        return 'FiveOfAKind';
    } else if (uniqueCounts.has(4)) {
        return cardCounts.J === 0 ? 'FourOfAKind' : 'FiveOfAKind';
    } else if (uniqueCounts.has(3) && uniqueCounts.has(2)) {
        return cardCounts.J === 0 ? 'FullHouse' : 'FiveOfAKind';
    } else if (uniqueCounts.has(3)) {
        return cardCounts.J === 0 ? 'ThreeOfAKind' : 'FourOfAKind';
    } else if (uniqueCounts.has(2)) {
        if (countOfTwos === 2) {
            if (cardCounts.J === 0) {
                return 'TwoPair';
            } else if (cardCounts.J === 1) {
                return 'FullHouse';
            } else if (cardCounts.J === 2) {
                return 'FourOfAKind';
            }
        } else {
            if (cardCounts.J === 0) {
                return 'OnePair';
            } else if (cardCounts.J === 1 || cardCounts.J === 2) {
                return 'ThreeOfAKind';
            }
        }
    } else if (uniqueCounts.has(1)) {
        return  cardCounts.J === 0 ? 'HighCard' : 'OnePair';
    }

}

function getHandType(hand) {
    const cardCounts = {};
    const cards = hand.split(' ')[0];
    for (const card of cards) {
        if (cardCounts[card]) {
            cardCounts[card]++;
        } else {
            cardCounts[card] = 1;
        }
    }

    const uniqueCounts = new Set(Object.values(cardCounts));
    const countOfTwos = Object.values(cardCounts).filter(count => count === 2).length;

    if (uniqueCounts.has(5)) {
        return 'FiveOfAKind';
    } else if (uniqueCounts.has(4)) {
        return 'FourOfAKind';
    } else if (uniqueCounts.has(3) && uniqueCounts.has(2)) {
        return 'FullHouse';
    } else if (uniqueCounts.has(3)) {
        return 'ThreeOfAKind';
    } else if (uniqueCounts.has(2)) {
        if (countOfTwos === 2) {
            return 'TwoPair';
        } else {
            return 'OnePair';
        }
    } else if (uniqueCounts.has(1)) {
        return 'HighCard';
    }
}

function getSortedHands(hands) {
    return hands.sort((a, b) => {
        const winningHand = getWinningHand(a, b);
        return winningHand === a ? 1 : -1;
    });
}

function getSortedHandsWithJokerRule(hands) {
    return hands.sort((a, b) => {
        const winningHand = getWinningHandWithJokerRule(a, b);
        return winningHand === a ? 1 : -1;
    });
}

function getHandRank(hand, allHands) {
    const sortedHands = getSortedHands(allHands);
    const currentHandIndex = sortedHands.findIndex(item => item === hand);
    return currentHandIndex + 1;
}

function getTotalWinnings(handsAndBids) {
    const sortedHands = getSortedHands(handsAndBids)
        .map(item => ({ hand: item.split(' ')[0], bid: parseInt(item.split(' ')[1]) }));

    let totalWinnings = 0;
    for (let i = 0; i < sortedHands.length; i++) {
        totalWinnings += sortedHands[i].bid * (i + 1);
    }

    return totalWinnings;
}

module.exports = { getHandType, getHandRank, getTotalWinnings, getWinningHand, getSortedHands, compareCards,
    compareCardsWithJokerRule, getHandTypeWithJokerRule, getTotalWinningsWithJokerRule, getWinningHandWithJokerRule, getSortedHandsWithJokerRule };

