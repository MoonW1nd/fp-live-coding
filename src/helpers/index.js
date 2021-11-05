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

export const writeFile = (filename, filepath, data) => {
    const filePath = path.join(__dirname, '../', filepath, filename);

    fs.writeFileSync(filePath, data);
};

const printToConsole = console.log;

export const log = (color, title, value) => {
    if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }

    printToConsole(
        `${chalk[color](`[${title.toUpperCase()}] `)}${chalk.white(
            value.replace('\n', ''),
        )}`,
    );
};
