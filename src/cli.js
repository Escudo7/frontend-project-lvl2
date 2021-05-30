import { Command } from 'commander/esm.mjs';
import { readFileSync } from 'fs';
import { extname } from 'path';
import _ from 'lodash';

const version = '0.0.1';

const findDiff = (data1, data2) => {
    const rowAddPrefix = '  + ';
    const rowRemovePrefix = '  - ';
    const rowSharePrefix = '    ';

    const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
    const diff = keys.reduce((acc, key) => {
        const newAcc = [...acc];

        if (!_.has(data1, key)) {
            return [...acc, `${rowAddPrefix}${key}: ${data2[key]}`];
        }

        if (!_.has(data2, key)) {
            return [...acc, `${rowRemovePrefix}${key}: ${data1[key]}`];
        }

        if (data1[key] === data2[key]) {
            return [...acc, `${rowSharePrefix}${key}: ${data1[key]}`];
        }

        const row1 = `${rowRemovePrefix}${key}: ${data1[key]}`;
        const row2 = `${rowAddPrefix}${key}: ${data2[key]}`;

        return [...acc, row1, row2];
    }, []);

    diff.unshift('{');
    diff.push('}');

    return "\n" + diff.join("\n") + "\n";
};

export default () => {
    const program = new Command();
    program
        .version(version)
        .option('-f, --format [type]', 'output format')
        .arguments('<path1> <path2>')
        .action((path1, path2) => {
            const content1 = readFileSync(path1);
            const content2 = readFileSync(path2);

            const extension1 = extname(path1);
            const extension2 = extname(path2);

            if (extension1 !== extension2 || extension1 !== '.json') {
                return
            }

            const contentParsed1 = JSON.parse(content1);
            const contentParsed2 = JSON.parse(content2);

            console.log(findDiff(contentParsed1, contentParsed2));
        })
        .description('Compares two configuration files and shows a difference.')
        .parse(process.argv);
};
