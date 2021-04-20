import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { validatePath, Anagrammer, sortWord } from './lib/index.js';

let lineInterface;

process.on('uncaughtException', error => {
    console.log(`An unexpected error has occured: ${error.message}`);
    console.log('Shutting down application');

    if (lineInterface) {
        lineInterface.close();
    }
    
    process.exit(1);
})

const run = () => {
    let filePath = process.argv[2];
    const filePathValidation = validatePath(filePath);

    if (!filePathValidation.valid) {
        console.log(filePathValidation.invalidReason);
        return;
    }

    lineInterface = createInterface({
        input: createReadStream(filePath),
        crlfDelay: Infinity
    });

    const anagrammer = new Anagrammer(sortWord);

    // do not use the shorthand lineInterface.on('line', anagrammer.add);
    // In arrow functions, 'this' scope is inherited from the execution context. As such, we cannot use the class private field in the context of the event handler
    lineInterface.on('line', (word) => anagrammer.add(word));
    lineInterface.on('close', () => anagrammer.print());
}

run();
