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

export const print = (color, title, value) => {
    printToConsole(`${chalk[color](`[${title}]\n`)}${chalk.black(value)}`);
};

export const URL_REG_EXP = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
    'i',
); // fragment locator
