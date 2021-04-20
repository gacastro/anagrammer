import { createWriteStream } from 'fs';

function getRandomLowerCaseLetterCodePoint() {
  const min = Math.ceil(97); //code point for a
  const max = Math.floor(122); //code point for z

  return Math.floor(Math.random() * (max - min + 1) + min);
}

function stringToPrint(stringSize) {
  let stringToReturn = '';

  for (let i = 0; i < stringSize; i++) {
    stringToReturn += String.fromCodePoint(getRandomLowerCaseLetterCodePoint());
  }

  stringToReturn += '\n';
  return stringToReturn;
}

function write() {
  let continueWritting = true;
  
  do {
    console.log(`Number of lines left to write ${numberLinesToWrite}`);
    
    numberLinesToWrite--;
    
    if (numberLinesToWrite === 0) {
      // Last time!
      file.end();
    } else {
      // See if we should continue, or wait.
      // Don't pass the callback, because we're not done yet.
      if (numberLinesToWrite >= 1e4) {
        continueWritting = file.write(stringToPrint(1e3));
      }
      if (numberLinesToWrite > 1e2) {
        continueWritting = file.write(stringToPrint(600));
      }
      if (numberLinesToWrite <= 1e2) {
        continueWritting = file.write(stringToPrint(300));
      }
    }
  } while (numberLinesToWrite > 0 && continueWritting);

  if (numberLinesToWrite > 0) {
    // Had to stop early!
    // Write some more once it drains.
    file.once('drain', write);
  }
}

let numberLinesToWrite = 1e6;
const file = createWriteStream('example-files/big-big.file');

write();
