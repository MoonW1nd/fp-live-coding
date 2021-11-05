export const getDataFromUrlStrings = (urlStrings) => {
    const urlsInfo = [];

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
};
