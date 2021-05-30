import { Command } from 'commander/esm.mjs';
import { readFileSync } from 'fs';
import { extname } from 'path';
import genDiff from './genDiff';

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

      const extension1 = extname(path1);
      const extension2 = extname(path2);

      if (extension1 !== extension2 || extension1 !== '.json') {
        return;
      }

      const contentParsed1 = JSON.parse(content1);
      const contentParsed2 = JSON.parse(content2);
      const diff = genDiff(contentParsed1, contentParsed2);

      console.log(diff);
    })
    .description('Compares two configuration files and shows a difference.')
    .parse(process.argv);
};
