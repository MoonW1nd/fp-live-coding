import { log, readFile, writeFile } from './helpers/index';

console.clear();

const path = process.env.FILE_PATH;

log('green', 'Read file', path);

let fileData;

try {
    fileData = readFile(path);
} catch (e) {
    log('red', 'Error', e.message);
}

const logs = fileData.match(/[^\r\n]+/g);

const logsWithErrors = [];

for (let i = 0; i < logs.length; i++) {
    const logData = logs[i].match(
        /([\d-:,\s]+)\s\(.+\)\s(\w+)\s+\(([^)]+)\)\s(.+)/,
    );

    const logInfo = {
        time: logData[1],
        type: logData[2],
        component: logData[3],
        message: logData[4],
    };

    if (
        (logInfo.type === 'ERROR' || logInfo.type === 'WARN') &&
        logInfo.component === 'search-interfaces-infra'
    ) {
        logsWithErrors.push(logInfo);
    }
}

const formatedLogs = JSON.stringify(logsWithErrors, null, 2);

log('green', 'Write to file', formatedLogs);

try {
    writeFile('errorsLog.json', '../', formatedLogs);
} catch (e) {
    log('red', 'Error', e.message);
}
