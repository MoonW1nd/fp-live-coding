import { log, readFile, writeFile } from './helpers/index';

console.clear();

const path = process.env.FILE_PATH;

let fileData;

log('green', 'Read file', path);

try {
    fileData = readFile(path);
} catch (e) {
    log('red', 'Error', e.message);
}

const urls = fileData.match(/[^\r\n]+/g) || [];

const urlsInfo = [];

for (let i = 0; i < urls.length; i++) {
    let parsedUrl;

    try {
        parsedUrl = new URL(urls[i]);
    } catch (e) {
        log('red', 'Error', e.message);
    }

    if (
        parsedUrl &&
        (parsedUrl.protocol === 'https:' || parsedUrl.protocol === 'http:') &&
        parsedUrl.hostname === 'market.yandex.ru'
    ) {
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

log('green', 'Write to file', formatedUrlsInfo);

try {
    writeFile('urlsInfo.json', '../', formatedUrlsInfo);
} catch (e) {
    log('red', 'Error', e.message);
}
