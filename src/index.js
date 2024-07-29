import { compose, curry, prop, match, equals } from 'ramda';
import { log, readFile, writeFile } from './helpers/index';

console.clear();

const curriedLog = curry(log);
const logGreen = curriedLog('green');
const logRed = curriedLog('red');

const logError = logRed('Error');
const logReadFile = logGreen('Read file');
const logWriteFile = logGreen('Write file');

const getMessage = prop('message');
const getType = prop('type');
const getComponent = prop('component');

const splitFileByLine  = match(/[^\r\n]+/g);

const logErrorMessage = compose(logError, getMessage);
const parseLog = match(/([\d-:,\s]+)\s\(.+\)\s(\w+)\s+\(([^)]+)\)\s(.+)/);

const isError = equals('ERROR');
const isWarn = equals('WARN');
const isInfraComponent = equals('search-interfaces-infra');
const isErrorLog = compose(isError, getType);
const isWarnLog = compose(isWarn, getType);
const isInfraComponentLog = compose(isInfraComponent, getComponent);

const path = process.env.FILE_PATH;

logReadFile(path);

let fileData;

try {
    fileData = readFile(path);
} catch (e) {
    logErrorMessage(e);
}

const logs = splitFileByLine(fileData);

const logsWithErrors = [];

for (let i = 0; i < logs.length; i++) {
    const logData = parseLog(logs[i]);

    const logInfo = {
        time: logData[1],
        type: logData[2],
        component: logData[3],
        message: logData[4],
    };

    if (
        (isErrorLog(logInfo) || isWarnLog(logInfo)) &&
        isInfraComponentLog(logInfo)
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
