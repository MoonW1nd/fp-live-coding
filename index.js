import { print, readFile, writeFile } from './helpers';

console.clear();

// Получение валидных урлов
const fileData = readFile('./data');
const urlStrings = fileData.split('|');

const urlsInfo = [];

for (let i = 0; i < urlStrings.length; i++) {
    // Парсим url
    const url = new URL(urlStrings[i]);

    // Обрабатываем только https:// url Маркета
    if (
        url.protocol === 'https:' &&
        (url.hostname === 'market.yandex.ru' ||
        url.hostname === 'pokupki.market.yandex.ru')
    ) {
        // Получаем данные о sku, hostname и pathname
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

// логирум данный
print('green', 'Urls info', formatedUrlsInfo);

// пишем данные в файл
writeFile('./urlsInfo', formatedUrlsInfo);
