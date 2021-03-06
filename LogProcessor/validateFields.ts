function validateFields(rawData: string, cacheStatus: string[]) {
    const rows: string[] = rawData.split('\n').filter(x => x !== '');
    // remove the header row
    rows.shift();
    
    const cacheErrors = checkCacheStatus(rows, cacheStatus);
    const fieldsErrors = checkFieldsLength(rows);
    const report = {
        errors: cacheErrors.errors.concat(fieldsErrors.errors),
        incorrectIndexes: cacheErrors.incorrectIndexes.concat(fieldsErrors.incorrectIndexes)
    }
    return report;
}

function checkCacheStatus(rows: string[], cacheStatuses: string[]) {
    const rowsArray = [...rows];
    const cacheErrors = {
        errors: [],
        incorrectIndexes: []
    };
    for (let s = 0; s < cacheStatuses.length; s++) {
        if (cacheStatuses[s] !== 'hit' && cacheStatuses[s] !== 'miss') {
            let errorText = rowsArray[s].split(' ')[7];
            cacheErrors.errors.push(`Invalid cache status in ${errorText} on line ${s + 2}`);
            cacheErrors.incorrectIndexes.push(s);
        }
    }
    return cacheErrors;
}

function checkFieldsLength(rows: string[]) {
    let rowsArray: string[] = [...rows];
    const lengthErrors = {
        errors: [],
        incorrectIndexes: []
    };
    
    for (let row = 0; row < rowsArray.length; row++) {
        let currentTextRow: string = rowsArray[row];
        let startQuote: number = rowsArray[row].indexOf('"');
        let endQuote: number = rowsArray[row].indexOf('"', startQuote + 1);
        while (startQuote > 0) {
            let originalStr: string = rowsArray[row].substring(startQuote + 1, endQuote);
            let replacedStr: string = rowsArray[row].substring(startQuote + 1, endQuote).replace(/ /g, '_');
            currentTextRow = currentTextRow.replace(originalStr, replacedStr);
            startQuote = rowsArray[row].indexOf('"', endQuote + 1);
            endQuote = rowsArray[row].indexOf('"', startQuote + 1);
        }

        let len: number = currentTextRow.split(' ').length;
        if (len !== 18) {
            lengthErrors.errors.push(`Expecting 18 fields but received ${len} on line ${row + 2}`);
            lengthErrors.incorrectIndexes.push(row);
        }
    }
    return lengthErrors;
}

export = {
    validateFields
}
