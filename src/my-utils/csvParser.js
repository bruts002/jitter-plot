const lineParser = (acc, curr, lineNumber) => {
    const line = curr.split(',');
    if (lineNumber === 0) {
        acc.headers = line;
    } else {
        const datum = {};
        line.forEach( (entry,index) => {
            datum[acc.headers[index]] = entry;
        });
        acc.result.push(datum)
    }
    return acc;
};

export default (contents='') =>
    contents
        .split(/[\r\n]+/g)
        .reduce(lineParser, { headers: [], result: [] })
        .result;
