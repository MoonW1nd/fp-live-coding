import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const readFile = (filename) => {
    const filePath = path.resolve(__dirname, '../', filename);

    return fs.readFileSync(filePath, { encoding: 'utf8' });
};

const printToConsole = console.log;

export const printSearchParam = (color, name, value) => {
    let printedValue = value;

    if (typeof value === 'object') {
        printedValue = JSON.stringify(value, null, 2);
    }

    printToConsole(`${chalk[color](`[${name}]: `)}${chalk.white(printedValue)}`);
};

export const isValidURL = (str) => {
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
        'i',
    ); // fragment locator

    return !!pattern.test(str);
};

export const printEmptyLine = () => printToConsole('\n');
