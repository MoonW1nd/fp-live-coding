import { compose, curry, prop } from 'ramda';
import { log, readFile, writeFile } from './helpers/index';

console.clear();

const curriedLog = curry(log);
const logGreen = curriedLog('green');
const logRed = curriedLog('red');

const logError = logRed('Error');
const logReadFile = logGreen('Read file');
const logWriteFile = logGreen('Write file');

const getMessage = prop('message');

const logErrorMessage = compose(logError, getMessage);
// именно в порядке сначала getMessage потом logError у compose оно идет в порядке наоборот

const path = process.env.FILE_PATH;

logReadFile(path);

let fileData;

try {
    fileData = readFile(path);
} catch (e) {
    logErrorMessage(e);
}

const logs = fileData.match(/[^\r\n]+/g);

const logsWithErrors = [];

for (let i = 0; i < logs.length; i++) {
    const logData = logs[i].match(
        /([\d-:,\s]+)\s\(.+\)\s(\w+)\s+\(([^)]+)\)\s(.+)/,
    );

    const logInfo = {
        time: logData[1],
        type: logData[2],
        component: logData[3],
        message: logData[4],
    };

    if (
        (logInfo.type === 'ERROR' || logInfo.type === 'WARN') &&
        logInfo.component === 'search-interfaces-infra'
    ) {
        logsWithErrors.push(logInfo);
    }
}

const formatedLogs = JSON.stringify(logsWithErrors, null, 2);

logWriteFile(formatedLogs);

try {
    writeFile('errorsLog.json', '../', formatedLogs);
} catch (e) {
    logErrorMessage(e);
}
