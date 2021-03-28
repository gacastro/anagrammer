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

    const fileSize = statSync(filePath).size;
    const tenMegabytes = 10485760;

    if (fileSize >= tenMegabytes) {
        return {
            valid: false,
            invalidReason: 'The file to process is bigger than the allowed limit of 10MB'
        };
    }

    return {
        valid: true
    };
}
