const {getTotalWinnings, getHandType, getHandRank, getWinningHand, getSortedHands, compareCards,
    getTotalWinningsWithJokerRule, compareCardsWithJokerRule, getHandTypeWithJokerRule, getWinningHandWithJokerRule, getSortedHandsWithJokerRule } = require("../src/daySeven");

const hands = [ '32T3K 765', 'T55J5 684', 'KK677 28', 'KTJJT 220', 'QQQJA 483' ];

const sortedHands = [ '32T3K 765', 'KTJJT 220', 'KK677 28', 'T55J5 684', 'QQQJA 483' ];

//part 2
test('getWinningHandWithJokerRule returns KTJJT 220 for hands with joker rule', () => {
    expect(getWinningHandWithJokerRule('T55J5 684', 'KTJJT 220')
    ).toBe('KTJJT 220');
})

//à finir
// test('getSortedHandsWithJokerRule returns  for hands with joker rule', () => {
//     expect(getSortedHandsWithJokerRule(todo)
//     ).toBe(todo);
// })

test('getTotalWinningsWithJokerRule returns 5905 for hands with joker rule', () => {
    expect(getTotalWinningsWithJokerRule(hands)
    ).toBe(5905);
})

test('compareCardsWithJokerRule returns 2 for J and 2 cards with joker rule', () => {
    expect(compareCardsWithJokerRule('J', '2')
    ).toBe('2');
})

test('getHandTypeWithJokerRule returns OnePair for \'32T3K 765\' hand', () => {
    expect(getHandTypeWithJokerRule('32T3K 765')
    ).toBe('OnePair');
})

test('getHandTypeWithJokerRule returns FourOfAKind for \'QQQJA 483\' hand', () => {
    expect(getHandTypeWithJokerRule('QQQJA 483')
    ).toBe('FourOfAKind');
})

test('getHandTypeWithJokerRule returns FourOfAKind for \'KTJJT 220\' hand', () => {
    expect(getHandTypeWithJokerRule('KTJJT 220')
    ).toBe('FourOfAKind');
})

test('getHandTypeWithJokerRule returns TwoPair for \'KK677 28\' hand', () => {
    expect(getHandTypeWithJokerRule('KK677 28')
    ).toBe('TwoPair');
})

//Part One

test('compareCards returns J for J and 2 cards', () => {
    expect(compareCards('J', '2')
    ).toBe('J');
})

test('getTotalWinnings returns 6440 for hands', () => {
    expect(getTotalWinnings(hands)
    ).toBe(6440);
})

test('getHandType returns OnePair for \'32T3K 765\' hand', () => {
    expect(getHandType('32T3K 765')
    ).toBe('OnePair');
})

test('getHandType returns ThreeOfAKind for \'T55J5 684\' hand', () => {
    expect(getHandType('T55J5 684')
    ).toBe('ThreeOfAKind');
})

test('getHandType returns TwoPair for \'KK677 28\' hand', () => {
    expect(getHandType('KK677 28')
    ).toBe('TwoPair');
})

test('getHandRank returns 1 for weakest hand in hands array', () => {
    expect(getHandRank('32T3K 765', hands)
    ).toBe(1);
})

test('getHandRank returns 5 for strongest hand in hands array', () => {
    expect(getHandRank('QQQJA 483', hands)
    ).toBe(5);
})

test('getWinningHand returns \'KK677 28\' for winning hand in hands array', () => {
    expect(getWinningHand('KK677 28', '32T3K 765')
    ).toBe('KK677 28');
})

test('getWinningHand returns \'QQQJA 483\' for winning hand in hands array', () => {
    expect(getWinningHand('QQQJA 483', 'T55J5 684')
    ).toBe('QQQJA 483');
})

test('getSortedHands returns returns sorted hands for hands array', () => {
    expect(getSortedHands(hands)
    ).toStrictEqual(sortedHands);
})

