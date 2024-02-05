//Day One

const fs = require("fs");

const data = lireFichierTexte('dayOne', 'inputPartOne.example.text');
console.log('day 1 (test) : ', dayOnePartOne(data))
//
const vraiData = lireFichierTexte('dayOne', 'input.text');
console.log('day 1 (vrai) :', dayOnePartOne(vraiData))

const mapping = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
};

function dayOnePartOne(data) {
    let sum = 0;
    for (let string of data) {
        let number = getCalibrationValue(string);
        sum += number;
    }
    return sum;
}

function dayOnePartTwo(data) {
    let sum = 0;
    for (let string of data) {
        let firstDigit = findFirstDigitFromStart(string)
        let lastDigit = findLastDigitFromEnd(string);
        let nb = firstDigit * 10 + lastDigit;
        sum += nb;
    }
    return sum;
}

function getCalibrationValue(chaine) {

    const chiffresTrouves = chaine.match(/\d/g);
    if (chiffresTrouves && chiffresTrouves.length >= 1) {
        const premierChiffre = parseInt(chiffresTrouves[0]);
        const dernierChiffre = parseInt(chiffresTrouves[chiffresTrouves.length - 1]);

        return premierChiffre * 10 + dernierChiffre;
    } else {
        console.error("Aucun chiffre trouvé dans la chaîne.");
        return null;
    }
}

function lireFichierTexte(folder, cheminFichier) {

    const cheminComplet = `./files/${folder}/${cheminFichier}`;

    try {
        return fs.readFileSync(cheminComplet, 'utf8')
            .split('\n')
            .filter(ligne => ligne.trim() !== '');
    } catch (error) {
        console.error(`Erreur lors de la lecture du fichier ${fileName} pour le jour ${day}:`, error.message);
        return [];
    }
}

function remplacerMotsParChiffres(chaine) {
    // Utiliser une expression régulière pour rechercher les mots correspondants
    const pattern = new RegExp(Object.keys(mapping).join('|'), 'ig');

    // Remplacer les mots par les chiffres correspondants
    return chaine.replace(pattern, match => mapping[match.toLowerCase()]);
}

function findLastDigitFromEnd(chaine) {
    let lastDigitFound = false;
    let lastDigit = 0;
    for (let i = chaine.length -1 ; i >= 0; i--) {
        const char = chaine[i];
        if (char >= '0' && char <= '9') {
            lastDigit = parseInt(char);
            lastDigitFound = true;
        } else {
            for (let j= i + 1; j <= chaine.length; j++) {
                let resteChaine = chaine.substring(i, j).toLowerCase();
                let digitWord = mapping[resteChaine];
                if (digitWord !== undefined) {
                    lastDigit = digitWord;
                    lastDigitFound = true;
                    break;
                }
            }
        }
        if (lastDigitFound === true) {
            break;
        }
    }
    return lastDigit;
}

function findFirstDigitFromStart(chaine) {
    let firstDigitFound = false;
    let firstDigit = 0;
    for (let i = 0 ; i < chaine.length; i++) {
        const char = chaine[i];
        if (char >= '0' && char <= '9') {
            firstDigit = parseInt(char);
            firstDigitFound = true;
            break;
        } else {
            for (let j= i + 1; j <= chaine.length; j++) {
                let resteChaine = chaine.substring(i, j).toLowerCase();
                let digitWord = mapping[resteChaine];
                if (digitWord !== undefined) {
                    firstDigit = digitWord;
                    firstDigitFound = true;
                    break;
                }
            }

        }
        if (firstDigitFound === true) {
            break;
        }
    }
    return firstDigit;
}

module.exports = {dayOnePartOne, lireFichierTexte, getCalibrationValue,
    dayOnePartTwo, remplacerMotsParChiffres, findLastDigitFromEnd, findFirstDigitFromStart};
