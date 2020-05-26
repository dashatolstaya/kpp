const readlineSync = require('readline-sync');

const generateNumber = () => {
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let guessArr = [];
    while (guessArr.length < 4) {
        let randomIndex = Math.floor(Math.random() * numbers.length);
        if (!guessArr.includes(randomIndex)) {
            guessArr.push(randomIndex)
        }
    }
    return guessArr
}

const guessNumber = () => {
    const guessArr = generateNumber();
    const guessStr = guessArr.join('')
    let attemps = 0;
    let yourArr;
    let yourStr;

    console.log('Guess the number');

    while (guessStr !== yourStr) {
        yourStr = readlineSync.question('Number: ');
        yourArr = yourStr.split("").map(Number)
        let bulls = 0;
        let cows = 0;
        guessArr.forEach((item, index) => {
            if (item == yourArr[index]) {
                ++bulls;
            } else if (yourArr.indexOf(item) !== -1) {
                ++cows;
            }
        })
        ++attemps;
        console.log(`Bulls: ${bulls}; Cows: ${cows}`);
    }
    console.log(`That's the right number! Attempts: ${attemps}`);
}

guessNumber()