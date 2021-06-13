import { Command } from 'commander/esm.mjs';
import getDiff from './getDiff.js';

const version = '0.0.1';

export default () => {
  const program = new Command();
  program
    .version(version)
    .option('-f, --format [type]', 'output format', 'stylish')
    .arguments('<path1> <path2>')
    .action((path1, path2, options) => {
      const diff = getDiff(path1, path2, options.format);
      console.log(diff);
    })
    .description('Compares two configuration files and shows a difference.')
    .parse(process.argv);
};
