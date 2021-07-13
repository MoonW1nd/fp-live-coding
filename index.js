import { print, readFile } from './helpers';

console.clear();

// Получение валидных урлов
const fileData = readFile('./data');
const strings = fileData.split('|');
const resultData = [];

for (let i = 0; i < strings.length; i++) {
    // Парсим url
    const parsedUrl = new URL(strings[i]);

    // Обрабатываем только https:// url Маркета
    if (
        parsedUrl.protocol === 'https:' &&
        (parsedUrl.hostname === 'market.yandex.ru' ||
        parsedUrl.hostname === 'pokupki.market.yandex.ru')
    ) {
        // Получаем данные о sku, hostname и pathname
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

// выводим результат в консоль
print('green', 'Parsed data', JSON.stringify(resultData, null, 2));
