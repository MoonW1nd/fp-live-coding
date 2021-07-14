import { log, readFile, writeFile } from './helpers';

console.clear();

// читаем данные из файла
const fileData = readFile('./data');
const urlStrings = fileData.split('|');

const urlsInfo = [];

for (let i = 0; i < urlStrings.length; i++) {
    // парсим url
    const url = new URL(urlStrings[i]);

    // обрабатываем только https:// url Маркета
    if (
        url.protocol === 'https:' &&
        (url.hostname === 'market.yandex.ru' ||
        url.hostname === 'pokupki.market.yandex.ru')
    ) {
        // получаем данные о url
        const { hostname, pathname, protocol, search } = url;

        urlsInfo.push({
            protocol,
            hostname,
            pathname,
            query: search,
        });
    }
}

// форматируем данные
const formatedUrlsInfo = JSON.stringify(urlsInfo, null, 2);

// логируeм данные
log('green', 'Urls info', formatedUrlsInfo);

// пишем данные в файл
writeFile('urlsInfo', './', formatedUrlsInfo);
