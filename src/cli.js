import { Command } from 'commander/esm.mjs';

const version = '0.0.1';

export default () => {
    const program = new Command();
    program
        .version(version)
        .option('-f, --format [type]', 'output format')
        .description('Compares two configuration files and shows a difference.')
        .parse(process.argv);
};
