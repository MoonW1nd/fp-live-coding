import { log, readFile, writeFile } from './helpers/index';

console.clear();

log('green', 'Read file', '../data');

let fileData = '';

try {
    fileData = readFile('./data');
} catch (e) {
    log('red', 'Error', e.message);
}

const fileStrings = fileData.match(/[^\r\n]+/g) || [];

const urlsInfo = [];

for (let i = 0; i < fileStrings.length; i++) {
    let parsedUrl;

    try {
        parsedUrl = new URL(fileStrings[i]);
    } catch (e) {
        log('red', 'Error', e.message);
    }

    if (
        parsedUrl &&
        (parsedUrl.protocol === 'https:' || parsedUrl.protocol === 'http:') &&
        parsedUrl.hostname === 'market.yandex.ru'
    ) {
        log('green', 'Get data from url', parsedUrl);

        const { hostname, pathname, protocol, search } = parsedUrl;

        urlsInfo.push({
            protocol,
            hostname,
            pathname,
            query: search,
        });
    }
}

const formatedUrlsInfo = JSON.stringify(urlsInfo, null, 2);

log('green', 'Write url info', formatedUrlsInfo);

try {
    writeFile('urlsInfo', './', formatedUrlsInfo);
} catch (e) {
    log('red', 'Error', e.message);
}
