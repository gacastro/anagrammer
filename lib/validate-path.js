import { existsSync, statSync } from 'fs';

export default (filePath) => {
    if (!filePath) {
        return {
            valid: false,
            invalidReason: 'You should provide the location of the file to process for anagrams'
        };
    }

    if (!existsSync(filePath)) {
        return {
            valid: false,
            invalidReason: 'The location of the file to process for anagrams does not exist'
        };
    }

    return {
        valid: true
    };
}
