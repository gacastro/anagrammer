export default class Anagrammer {
    #sortWord
    #anagrams
    #wordsFound

    constructor(sortWord) {
        this.#sortWord = sortWord;
        this.#anagrams = new Map();
        this.#wordsFound = 0;
    }

    get anagrams() {
        return this.#anagrams;
    }

    add(word) {
        try {
            const sortedWord = this.#sortWord(word);
            const anagramWords = this.#anagrams.get(sortedWord);

            if (anagramWords && !anagramWords.includes(word)) {
                anagramWords.push(word);
                console.log(`${this.#wordsFound++} words found`)
            }

            if (!anagramWords) {
                this.#anagrams.set(sortedWord, [word]);
                console.log(`${this.#wordsFound++} words found`)
            }
        } catch (error) {
            console.log(`*** The following error occured while adding '${word}' to the anagramer:`);
            console.log(`==> ${error.message}`);
        }
    }

    print() {
        if (this.#anagrams.size === 0) {
            console.log('Cannot print anagrams because none were found');
        }

        this.#anagrams.forEach(anagramWords => {
            try {
                // anagramWords could bigger than the allocated memory for a string
                console.log(anagramWords.join(','));
            } catch (error) {
                console.log('*** The following error occured while printing anagrams:');
                console.log(`==> ${error.message}`);
            }
        });
    };
}
