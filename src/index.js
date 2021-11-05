import { log, readFile, writeFile } from './helpers/index';

console.clear();

let fileData = null;

try {
    fileData = readFile('../data');

    log('green', 'Success file read', '../data');
} catch (e) {
    log('red', 'Fail file read', e);
}

const urlsInfo = [];

if (fileData) {
    const urlStrings = fileData.split('|');

    for (let i = 0; i < urlStrings.length; i++) {
        const url = new URL(urlStrings[i]);

        if (
            url.protocol === 'https:' &&
            (url.hostname === 'market.yandex.ru' ||
                url.hostname === 'pokupki.market.yandex.ru')
        ) {
            const { hostname, pathname, protocol, search } = url;

            urlsInfo.push({
                protocol,
                hostname,
                pathname,
                query: search,
            });
        }
    }
}

if (urlsInfo.length > 0) {
    const formatedUrlsInfo = JSON.stringify(urlsInfo, null, 2);

    log('green', 'Urls info', formatedUrlsInfo);

    try {
        writeFile('urlsInfo', './', formatedUrlsInfo);

        log('green', 'Success file save', './urlsInfo');
    } catch (e) {
        log('red', 'Error file save', './urlsInfo');
    }
}
