import { Command } from 'commander/esm.mjs';
import { readFileSync } from 'fs';
import { extname } from 'path';
import genDiff from './genDiff.js';
import parser from './parsers.js';

const version = '0.0.1';

export default () => {
  const program = new Command();
  program
    .version(version)
    .option('-f, --format [type]', 'output format')
    .arguments('<path1> <path2>')
    .action((path1, path2) => {
      const content1 = readFileSync(path1);
      const content2 = readFileSync(path2);
      const contentParsed1 = parser(content1, extname(path1));
      const contentParsed2 = parser(content2, extname(path2));
      const diff = genDiff(contentParsed1, contentParsed2);

      console.log(diff);
    })
    .description('Compares two configuration files and shows a difference.')
    .parse(process.argv);
};
