import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { complement, compose, partial, partialRight, when } from 'ramda';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathResolve = partial(path.resolve, [__dirname, '../']);
const readUtfFile = partialRight(fs.readFileSync, [{ encoding: 'utf8' }]);

export const readFile = compose(readUtfFile, pathResolve);

export const writeFile = (filename, filepath, data) => {
    const filePath = pathResolve(filepath, filename);

    fs.writeFileSync(filePath, data);
};

const printToConsole = console.log;
const isString = (value) => typeof value === 'string';
const isNotString = complement(isString);
const prepareValueForLog = when(isNotString, JSON.stringify);

export const log = (color, title, value) => {
    value = prepareValueForLog(value);

    printToConsole(
        `${chalk[color](`[${title.toUpperCase()}] `)}${chalk.white(
            value.replace('\n', ''),
        )}`,
    );
};
