import { readFile, printSearchParam, URL_REG_EXP } from './helpers';

console.clear();

// Получение валидных урлов
const fileData = readFile('./data');
const strings = fileData.split('\n');
const resultData = [];

for (let i = 0; i < strings.length; i++) {
    if (!URL_REG_EXP.test(strings[i])) {
        printSearchParam('warn', strings[i], 'not url string');

        break;
    }

    const url = strings[i];

    printSearchParam('success', url, 'parseUrl');

    // Парсинг урлов маркета и получение интересующих нас параметров
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol === 'https:' && parsedUrl.hostname === 'market.yandex.ru') {
        const { searchParams } = parsedUrl;
        const skuId = searchParams.get('sku');
        const filters = searchParams.get('glfilter');

        printSearchParam('success', { skuId, filters }, 'skuId and Filters');

        resultData.push({ url, skuId, filters });
    }
}

// Запись получившейся информации в файл
printSearchParam('success', resultData, 'write data to file');
