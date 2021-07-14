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

export const writeFile = (filename, path, data) => {
    const filePath = path.join(__dirname, '../', path, filename);

    fs.writeFileSync(filePath, data);
};

const printToConsole = console.log;

export const log = (color, title, value) => {
    printToConsole(`${chalk[color](`[${title}]\n`)}${chalk[color](value)}`);
};
