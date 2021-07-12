import { readFile, printSearchParam, URL_REG_EXP } from './helpers';

const fileData = readFile('./data');
const strings = fileData.split('\n');

for (let i = 0; i < strings.length; i++) {
    if (!URL_REG_EXP.test(strings[i])) {
        printSearchParam('warn', strings[i], 'not url string');

        break;
    }

    const url = strings[i];

    printSearchParam('success', url, 'parseUrl');

    const parsedUrl = new URL(url);

    if (parsedUrl.protocol === 'https:' && parsedUrl.hostname === 'market.yandex.ru') {
        const { searchParams } = parsedUrl;
        const skuId = searchParams.get('sku');
        const filters = searchParams.get('glfilter');

        printSearchParam('success', { skuId, filters }, 'skuId and Filters');

        printSearchParam('success', { url, skuId, filters }, 'write data to file');
    }
}
