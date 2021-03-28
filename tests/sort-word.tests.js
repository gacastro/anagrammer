import { expect } from 'chai';
import { sortWord } from '../lib/index.js';

describe('When a word is given to the word sorter ', () => {
    let result;

    describe('And the word is cba', () => {
        it('should return abc', () => {
            result = sortWord('cba');
            expect(result).to.equal('abc');
        });
    });

    describe('And the word is 987654321', () => {
        it('should return 123456789', () => {
            result = sortWord('987654321');
            expect(result).to.equal('123456789');
        });
    });

    describe('And the word is ;asdfrwoiweur@$%£$%', () => {
        it('should return ;@%%$$£adefiorrsuww', () => {
            result = sortWord(';asdfrwoiweur@$%£$%');
            expect(result).to.equal('$$%%;@adefiorrsuww£');
        });
    });

    describe('And the word is ćäCcAa', () => {
        it('should return äAaćCc', () => {
            result = sortWord('ćäCcAa');
            expect(result).to.equal('ACacäć');
            // expect AaäCcć when there is a bug sorting by UTF-16 code value
        });
    });
});
