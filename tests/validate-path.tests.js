import { expect } from 'chai';
import { validatePath } from '../lib/index.js';

describe('When a path is given to validate', function () {
    let filePathValidation;

    describe('And the path is valid', () => {
        before(function () {
            filePathValidation = validatePath('example-files/example2.txt');
        });

        it('should return its a valid path', function () {
            expect(filePathValidation.valid).to.be.true;
        });

        it('should not return an invalid reason', function () {
            expect(filePathValidation.invalidReason).to.be.undefined;
        });
    });

    describe('And the path is undefined', function () {
        before(function () {
            filePathValidation = validatePath(undefined);
        });

        it('should return its an invalid path', function () {
            expect(filePathValidation.valid).to.be.false;
        });

        it('should return an invalid reason', function () {
            expect(filePathValidation.invalidReason).to
                .equal('You should provide the location of the file to process for anagrams');
        });
    });

    describe('And its not a path', function () {
        before(function () {
            filePathValidation = validatePath('1323');
        });

        it('should return its an invalid path', function () {
            expect(filePathValidation.valid).to.be.false;
        });

        it('should return an invalid reason', function () {
            expect(filePathValidation.invalidReason).to
                .equal('The location of the file to process for anagrams does not exist');
        });
    });

    describe('And its a file bigger than 10Mb', function () {
        before(function () {
            filePathValidation = validatePath('example-files/oversized.file');
        });

        it('should return its an invalid path', function () {
            expect(filePathValidation.valid).to.be.false;
        });

        it('should return an invalid reason', function () {
            expect(filePathValidation.invalidReason).to
                .equal('The file to process is bigger than the allowed limit of 10MB');
        });
    });
});