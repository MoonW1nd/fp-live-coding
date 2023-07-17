import {
    allPass,
    anyPass,
    applySpec,
    compose,
    curry,
    equals,
    filter,
    map,
    match,
    nth,
    partial,
    partialRight,
    prop,
    tap,
    tryCatch,
} from 'ramda';
import { log, readFile, writeFile } from './helpers/index';

console.clear();

/**
 * Гетеры
 */
const getMessage = prop('message');
const getType = prop('type');
const getComponent = prop('component');
const getParsedLogTime = nth(1);
const getParsedLogType = nth(2);
const getParsedLogComponent = nth(3);
const getParsedLogMassage = nth(4);

/**
 * Каррирования
 */
const curriedLog = curry(log);
const logRed = curriedLog('red');
const logGreen = curriedLog('green');
const logError = logRed('Error');
const logReadFile = logGreen('Read file');
const logWriteFile = logGreen('Write file');

/**
 * Частичное применение
 */
const formatLogs = partialRight(JSON.stringify, [null, 2]);
const writeErrorLogs = partial(writeFile, ['errorsLog.json', '../']);

/**
 * Написание сложных функций предикатов
 */
const isError = equals('ERROR');
const isWarn = equals('WARN');
const isInfraComponent = equals('search-interfaces-infra');
const isErrorLog = compose(isError, getType);
const isWarnLog = compose(isWarn, getType);
const isInfraComponentLog = compose(isInfraComponent, getComponent);
const isErrorOrWarnLog = anyPass([isErrorLog, isWarnLog]);
const isInfraErrorLog = allPass([isErrorOrWarnLog, isInfraComponentLog]);

/**
 * Функции высшего порядка
 */
const logErrorMessage = compose(logError, getMessage);

const createSafeFunction = (fn) => tryCatch(fn, logErrorMessage);
const readFileSafe = createSafeFunction(readFile);
const writeErrorLogsSafe = createSafeFunction(writeErrorLogs);

/**
 * Main
 */
const splitFileByLine = match(/[^\r\n]+/g);
const parseLog = match(/([\d-:,\s]+)\s\(.+\)\s(\w+)\s+\(([^)]+)\)\s(.+)/);

const getParsedLogInfo = applySpec({
    time: getParsedLogTime,
    type: getParsedLogType,
    component: getParsedLogComponent,
    message: getParsedLogMassage,
});

const getInfraErrorsLog = compose(
    filter(isInfraErrorLog),
    map(getParsedLogInfo),
    map(parseLog),
);

const app = compose(
    writeErrorLogsSafe,
    tap(logWriteFile),
    formatLogs,
    getInfraErrorsLog,
    splitFileByLine,
    readFileSafe,
    tap(logReadFile),
);

app(process.env.FILE_PATH);
