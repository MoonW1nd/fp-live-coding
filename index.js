import { readFile, printSearchParam, isValidURL } from './helpers';

const fileData = readFile('./data');
const strings = fileData.split('\n');

for (let i = 0; i < strings.length; i++) {
    if (!isValidURL(strings[i])) {
        printSearchParam('red', 'not url string', strings[i]);

        break;
    }

    const url = strings[i];

    printSearchParam('green', 'parseUrl', url);

    const parsedUrl = new URL(url);

    if (parsedUrl.protocol === 'https:' && parsedUrl.hostname === 'market.yandex.ru') {
        const { searchParams } = parsedUrl;
        const skuId = searchParams.get('sku');
        const filters = searchParams.get('glfilter');

        printSearchParam('green', 'skuId and Filters', { skuId, filters });

        printSearchParam('green', 'write data to file', { url, skuId, filters });
    }
}
