const fs = require("fs");

const {lireFichierTexte} = require('../src/dayOne');

// const data = lireFichierTexte('dayThree', 'inputPartOne.example.text');
// console.log('day 3 sample : ', dayThreePartOne(data))
//
// const vraiData = lireFichierTexte('dayThree', 'input.text');
// console.log('day 3 solution : ', dayThreePartTwo(vraiData))

//day 3 part 2

function getAdjacentToExactlyTwoNumbers(results) {
    const resultsArray = Object.values(results);

    // Filtrer les engrenages avec exactement deux nombres adjacents
    return resultsArray.filter(gearResult => {
        return gearResult.length === 2;
    });
}

function extraireTousNombresFromRows(rows) {
    let numbers = [];
    // Utiliser Object.entries pour obtenir un tableau des paires clé-valeur
    for (const [numeroLigne, ligne] of Object.entries(rows)) {
        // Appeler la fonction extraireNombresAvecPosition pour chaque ligne
        const nombresDansLigne = extraireNombresAvecPosition(ligne, parseInt(numeroLigne, 10));

        // Ajouter les nombres extraits au tableau numbers
        numbers.push(...nombresDansLigne);
    }

    return numbers;
}

function extraireTousAsteriskFromRows(rows) {
    let gears = [];
    // Utiliser Object.entries pour obtenir un tableau des paires clé-valeur
    for (const [numeroLigne, ligne] of Object.entries(rows)) {
        const gearsDansLigne = extraireGearAvecPosition(ligne, parseInt(numeroLigne, 10));

        // Ajouter les nombres extraits au tableau numbers
        gears.push(...gearsDansLigne);
    }

    return gears;
}

function extraireGearAvecPosition(ligne, numeroLigne) {
    // nb : il faut échapper caractère * sinon erreur dans regexp :
    const regex = new RegExp('\\*', 'g');
    let match;
    const resultats = [];

    // Parcourir toutes les occurrences avec exec
    while ((match = regex.exec(ligne)) !== null) {
        const positionDansLigne = match.index;

        resultats.push({
            ligne: numeroLigne,
            position: positionDansLigne,
        });
    }

    return resultats;
}

function dayThreePartTwo(rows) {
    let sum = 0;
    let numbers = extraireTousNombresFromRows(rows)
    let gears = extraireTousAsteriskFromRows(rows)
    let results = getAdjacentNumbersForGears(numbers, gears)
    let filtered = getAdjacentToExactlyTwoNumbers(results)
    for (let array of filtered) {
        let ratio = array[0] * array[1];
        sum += ratio;
    }
    return sum;
}

function getAdjacentNumbersForGears(numbers, gears) {
    const result = {};

    gears.forEach(gear => {
        const { ligne, position } = gear;
        const adjacentNumbers = [];

        numbers.forEach(nombre => {
            const { valeur, ligne: numLigne, position: numPosition } = nombre;
            const nbLength = valeur.toString().length;

            if (
                (numLigne === ligne && (numPosition === position + 1 || (position - nbLength >= 0 && numPosition === position - nbLength))) ||
                (numLigne === ligne - 1 && (numPosition === position + 1 || numPosition === position || (position - nbLength >= 0 && numPosition >= position - nbLength && numPosition <= position))) ||
                (numLigne === ligne + 1 && (numPosition === position + 1 || numPosition === position || (position - nbLength >= 0 && numPosition >= position - nbLength && numPosition <= position)))
            ) {
                adjacentNumbers.push(valeur);
            }
        });

        result[`${ligne}-${position}`] = adjacentNumbers;
    });

    return result;
}


// let rows = getRowsArray('dayThree', 'input.text');
// console.log(dayThreePartTwo(rows))

//day 3 part 1

function dayThreePartOne(rows) {
    let numbers = [];
    // Utiliser Object.entries pour obtenir un tableau des paires clé-valeur
    for (const [numeroLigne, ligne] of Object.entries(rows)) {
        // Appeler la fonction extraireNombresAvecPosition pour chaque ligne
        const nombresDansLigne = extraireNombresAvecPosition(ligne, parseInt(numeroLigne, 10));

        // Ajouter les nombres extraits au tableau numbers
        numbers.push(...nombresDansLigne);
    }

    // Créer un nouveau tableau filtré sans supprimer les éléments pendant l'itération
    const nouveauxNumbers = numbers.filter(nombreObjet => {
        // Si je trouve un symbole adjacent au nombre, je garde le nombre
        if (
            isSymbolBeforeNumber(nombreObjet, rows) ||
            isSymbolAfterNumber(nombreObjet, rows) ||
            isSymbolAboveNumber(nombreObjet, rows) ||
            isSymbolBelowNumber(nombreObjet, rows)
        ) {
            return true;
        } else {
            return false;
        }
    });

    return addValues(nouveauxNumbers);
}

function addValues(tableau) {
    return tableau.reduce((total, nombreObjet) => total + nombreObjet.valeur, 0);
}

//test 06/12/23 donne 530799 - too high - pb indexOf utilisé in extraireNombresAvecPosition fausse position si plusieurs occurences :
// let rows = getRowsArray('dayThree', 'input.text');
// console.log(dayThreePartOne(rows))

//test with sample from input : pb sur position du nb 82 dans ligne 1 de sample :
//let rows = getRowsArray('dayThree', 'inputSample.example.text')
//console.log(dayThreePartOne(rows))

function isSymbol(char) {
    // Utiliser une expression régulière pour vérifier si le caractère est un symbole
    const isSymbolRegex = /[^A-Za-z0-9.]/;

    // Retourner true si le caractère est un symbole, sinon false
    return isSymbolRegex.test(char);
}

function isSymbolBeforeNumber(nombreObjet, rowsArray) {
    if (nombreObjet.position === 0) {
        return false;
    } else {
        let charToVerify = rowsArray[nombreObjet.ligne][nombreObjet.position - 1];
        return charToVerify !== undefined ? isSymbol(charToVerify) : false;
    }
}

function isSymbolAfterNumber(nombreObjet, rowsArray) {
    let rowsLength = rowsArray[nombreObjet.ligne].length;
    let nbLength = nombreObjet.valeur.toString().length;
    if (nombreObjet.position + nbLength > rowsLength) {
        return false;
    } else {
        let charToVerify = rowsArray[nombreObjet.ligne][nombreObjet.position + nbLength];
        return charToVerify !== undefined ? isSymbol(charToVerify) : false;
    }
}

function isSymbolAboveNumber(nombreObjet, rowsArray) {
    let rowsLength = rowsArray[nombreObjet.ligne].length;
    let nbLength = nombreObjet.valeur.toString().length;
    let positionMax = rowsLength <= (nombreObjet.position + nbLength) ? rowsLength : nombreObjet.position + nbLength;
    if (nombreObjet.ligne === 1) {
        return false;
    } else {
        let test = false;
        for (i = nombreObjet.position - 1; i <= positionMax; i++) {
            if (test === true) {
                break;
            }
            let charToVerify = rowsArray[nombreObjet.ligne - 1][i];
            test = charToVerify !== undefined ? isSymbol(charToVerify) : false;
        }
        return test;
    }
}

function isSymbolBelowNumber(nombreObjet, rowsArray) {
    let rowsLength = rowsArray[nombreObjet.ligne].length;
    let nbLength = nombreObjet.valeur.toString().length;
    let positionMax = rowsLength <= (nombreObjet.position + nbLength) ? rowsLength : nombreObjet.position + nbLength;

    const nombreDeLignes = Object.keys(rowsArray).length;
    if (nombreObjet.ligne === nombreDeLignes) {
        return false;
    } else {
        let test = false;
        for (i = nombreObjet.position - 1; i <= positionMax; i++) {
            if (test === true) {
                break;
            }
            let charToVerify = rowsArray[nombreObjet.ligne + 1][i];
            test = charToVerify !== undefined ? isSymbol(charToVerify) : false;
        }
        return test;
    }
}

//chat gpt
function isNumber(char) {
    // Check if the character is a digit
    return /\d/.test(char);
}

//NB : pb with indexOf car donne la position de la première occurrence, même si le nombre apparaît plus tard dans la ligne
//donc chatgpt fix :
// en utilisant une expression régulière globale avec exec et une boucle while, vous pouvez obtenir toutes les occurrences de la sous-chaîne dans la chaîne. La méthode exec conserve un état interne qui permet de trouver les prochaines occurrences à chaque appel ultérieur.
// La regex \d+ signifie "un ou plusieurs chiffres". L'utilisation du g à la fin de l'expression régulière signifie que la recherche se fera de manière globale, en trouvant toutes les occurrences plutôt que de s'arrêter après la première.
// La boucle while appelle exec à chaque itération pour trouver la prochaine occurrence du motif \d+ dans la ligne.
// Chaque appel de exec renvoie un objet avec des informations sur la correspondance, y compris la position de départ (match.index) de la correspondance dans la chaîne.
// La boucle continue jusqu'à ce qu'il n'y ait plus de correspondances.
function extraireNombresAvecPosition(ligne, numeroLigne) {
    // Utilisation d'une expression régulière globale pour trouver toutes les occurrences des nombres dans la ligne
    const regex = /\d+/g;
    let match;
    const resultats = [];

    // Parcourir toutes les occurrences avec exec
    while ((match = regex.exec(ligne)) !== null) {
        const positionDansLigne = match.index;
        const nombre = match[0];

        resultats.push({
            valeur: parseInt(nombre, 10),
            ligne: numeroLigne,
            position: positionDansLigne,
        });
    }

    return resultats;
}

function getRowsArray(folder, cheminFichier) {
    const lignes = lireFichierTexte(folder, cheminFichier);
    const tableauAssociatif = {};
    lignes.forEach((ligne, index) => {
        tableauAssociatif[index + 1] = ligne;
    });

    return tableauAssociatif;
}

module.exports = {extraireGearAvecPosition, dayThreePartTwo, getAdjacentToExactlyTwoNumbers, extraireTousNombresFromRows,
    extraireTousAsteriskFromRows,
    dayThreePartOne, getRowsArray, extraireNombresAvecPosition, isSymbol, isSymbolBeforeNumber, isSymbolAfterNumber,
    isSymbolAboveNumber, isSymbolBelowNumber, addValues};
