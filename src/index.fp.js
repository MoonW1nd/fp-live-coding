import {
    allPass,
    anyPass,
    applySpec,
    complement,
    compose,
    curry,
    equals,
    filter,
    isNil,
    map,
    match,
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
const getHostname = prop('hostname');
const getProtocol = prop('protocol');
const getPathname = prop('pathname');
const getSearch = prop('search');

/**
 * Каррирования
 */
const curriedLog = curry(log);
const logInfo = curriedLog('green');
const logError = curriedLog('red');
const logErrorWithTitle = logError('Error');
const logErrorMessage = compose(logErrorWithTitle, getMessage);
const logReadFile = logInfo('Read file');
const logWriteUrlInfo = logInfo('Write url info');

/**
 * Частичное применение
 */
const formatUrlsInfo = partialRight(JSON.stringify, [null, 2]);
const writeUrlsInfo = partial(writeFile, ['urlsInfo.json', '../']);

/**
 * Написание сложных функций предикатов
 */
const isMarketHostname = equals('market.yandex.ru');
const isMarketHostUrl = compose(isMarketHostname, getHostname);

const isHttpProtocol = equals('http:');
const isHttpsProtocol = equals('https:');

const isHttpUrl = compose(isHttpProtocol, getProtocol);
const isHttpsUrl = compose(isHttpsProtocol, getProtocol);
const hasUrl = complement(isNil);

const isHttpOrHttpsUrl = anyPass([isHttpUrl, isHttpsUrl]);
const isMarketUrl = allPass([hasUrl, isHttpOrHttpsUrl, isMarketHostUrl]);

/**
 * Функции высшего порядка
 */
const createSafeFunction = (fn) => tryCatch(fn, logErrorMessage);

const parseUrl = (url) => new URL(url);

const readFileSafe = createSafeFunction(readFile);
const parseUrlSafe = createSafeFunction(parseUrl);
const writeUrlsInfoSafe = createSafeFunction(writeUrlsInfo);

/**
 * Main
 */
const splitFileByLine = match(/[^\r\n]+/g);

const getUrlInfo = applySpec({
    hostname: getHostname,
    protocol: getProtocol,
    pathname: getPathname,
    query: getSearch,
});

const getMarketUlrsInfo = compose(
    map(getUrlInfo),
    filter(isMarketUrl),
    map(parseUrlSafe),
);

const app = compose(
    writeUrlsInfoSafe,
    tap(logWriteUrlInfo),
    formatUrlsInfo,
    getMarketUlrsInfo,
    splitFileByLine,
    readFileSafe,
    tap(logReadFile),
);

app(process.env.FILE_PATH);
