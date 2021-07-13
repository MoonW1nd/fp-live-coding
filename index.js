import { print, readFile } from './helpers';

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
        const { searchParams } = url;
        const skuId = searchParams.get('sku');
        const { hostname } = url;

        urlsInfo.push({
            hostname,
            skuId,
        });
    }
}

// выводим форматированный результат в консоль
const formatedUrlsInfo = JSON.stringify(urlsInfo, null, 2);
print('green', 'Market urls info', formatedUrlsInfo);
