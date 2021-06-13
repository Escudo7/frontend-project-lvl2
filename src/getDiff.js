import { readFileSync } from 'fs';
import { extname } from 'path';
import parser from './parsers.js';
import generateDiff from './generateDiff.js';
import getRenderer from './formatters/index.js';

export default (path1, path2, format) => {
  const content1 = readFileSync(path1);
  const content2 = readFileSync(path2);
  const contentParsed1 = parser(content1, extname(path1));
  const contentParsed2 = parser(content2, extname(path2));
  const diff = generateDiff(contentParsed1, contentParsed2);
  const renderer = getRenderer(format);

  return renderer === null ? null : renderer(diff);
};
