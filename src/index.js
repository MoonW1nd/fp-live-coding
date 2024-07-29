import { compose, curry, prop, match, equals, anyPass, allPass, nth, applySpec, filter, map } from 'ramda';
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

const getParsedLogTime = nth(1);
const getParsedLogType = nth(2);
const getParsedLogComponent = nth(3);
const getParsedLogMessage = nth(4);

const splitFileByLine  = match(/[^\r\n]+/g);

const logErrorMessage = compose(logError, getMessage);
const parseLog = match(/([\d-:,\s]+)\s\(.+\)\s(\w+)\s+\(([^)]+)\)\s(.+)/);

const isError = equals('ERROR');
const isWarn = equals('WARN');
const isInfraComponent = equals('search-interfaces-infra');
const isErrorLog = compose(isError, getType);
const isWarnLog = compose(isWarn, getType);
const isInfraComponentLog = compose(isInfraComponent, getComponent);

const isErrorOrWarnLog = anyPass([isWarnLog, isErrorLog]);
const isInfraErrorLog = allPass([isErrorOrWarnLog, isInfraComponentLog]);

const getLogInfo = applySpec({
    time: getParsedLogTime,
    type: getParsedLogType,
    component: getParsedLogComponent,
    message: getParsedLogMessage,
});

const getInfraErrorsLog = compose(
    filter(isInfraErrorLog),
    map(getLogInfo),
    map(parseLog),
);

const path = process.env.FILE_PATH;

logReadFile(path);

let fileData;

try {
    fileData = readFile(path);
} catch (e) {
    logErrorMessage(e);
}

const logs = splitFileByLine(fileData);

const logsWithErrors = getInfraErrorsLog(logs);

const formatedLogs = JSON.stringify(logsWithErrors, null, 2);

logWriteFile(formatedLogs);

try {
    writeFile('errorsLog.json', '../', formatedLogs);
} catch (e) {
    logErrorMessage(e);
}
