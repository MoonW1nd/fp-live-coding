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

export const writeFile = (filename, data) => {
    const filePath = path.join(__dirname, '../', filename);

    fs.writeFileSync(filePath, data);
};

const printToConsole = console.log;

export const print = (color, title, value) => {
    printToConsole(`${chalk[color](`[${title}]\n`)}${chalk[color](value)}`);
};
