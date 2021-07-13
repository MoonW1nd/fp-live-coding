import { print, readFile } from './helpers';

console.clear();

// Получение валидных урлов
const fileData = readFile('./data');
const strings = fileData.split('|');
const resultData = [];

for (let i = 0; i < strings.length; i++) {
    // Парсинг урлов маркета и получение интересующих нас параметров
    const parsedUrl = new URL(strings[i]);

    if (
        parsedUrl.protocol === 'https:' &&
        (parsedUrl.hostname === 'market.yandex.ru' ||
        parsedUrl.hostname === 'pokupki.market.yandex.ru')
    ) {
        const { searchParams } = parsedUrl;
        const skuId = searchParams.get('sku');
        const { pathname, hostname } = parsedUrl;

        resultData.push({
            hostname,
            pathname,
            skuId,
        });
    }
}

// Вывод результата
print('green', 'Parsed data', JSON.stringify(resultData, null, 2));
