import sinon from 'sinon';
import { expect } from 'chai';
import { Anagrammer } from '../lib/index.js';

describe('When we want to add a word into the anagrammer', function () {
    let anagrams;
    let anagramWords;
    const sortWord = sinon.stub();
    const anagrammer = new Anagrammer(sortWord);

    before(function () {
        anagrams = anagrammer.anagrams;
    });

    afterEach(function () {
        anagrams.clear();
        sortWord.resetBehavior();
    })

    describe('And there is an angram for that word', () => {
        it("should add the word cab to the anagram's group of words", function () {
            sortWord.returns('abc');
            anagrams.set('abc', ['cba', 'bac']);

            anagrammer.add('cab');

            anagramWords = anagrams.get('abc');

            expect(anagramWords.length).to.equal(3);
            expect(anagramWords).to.include('cab');
        });

        it("should add the word unf to the anagram's group of words", function () {
            sortWord.returns('fun');
            anagrams.set('fun', ['fun']);
            
            anagrammer.add('unf');
            
            anagramWords = anagrams.get('fun');

            expect(anagramWords.length).to.equal(2);
            expect(anagramWords).to.include('unf');
        });

        it("should NOT add the word unf when its already in the anagram's group of words", function () {
            sortWord.returns('fun');
            anagrams.set('fun', ['fun', 'unf']);
            
            anagrammer.add('unf');
            
            anagramWords = anagrams.get('fun');

            expect(anagramWords.length).to.equal(2);
            expect(anagramWords).to.include('unf');
        });

        it('should match by UTF-16 code value and not alphabeticaly', () => {
            sortWord.returns('Bäć');
            anagrams.set('Bäć', ['Bäć']);
            anagrams.set('Bac', ['caB', 'acB']);
            
            anagrammer.add('äBć');
            
            anagramWords = anagrams.get('Bäć');

            expect(anagramWords.length).to.equal(2);
            expect(anagramWords).to.include('äBć');
        });
    });

    describe('And there is no angram for that word', () => {
        it('should add the word hello as a new anagram', () => {
            sortWord.returns('hello');
            anagrammer.add('hello');
            anagramWords = anagrams.get('hello');

            expect(anagramWords.length).to.equal(1);
            expect(anagramWords).to.include('hello');
        });
    });
});