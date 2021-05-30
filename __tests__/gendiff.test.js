import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/genDiff.js';

test('genDiff', () => {
  const currentPath = fileURLToPath(import.meta.url);
  const currentDir = dirname(currentPath);
  const getPath = (fileName) => `${currentDir}/../__fixtures__/${fileName}`;

  const content1 = JSON.parse(readFileSync(getPath('json1.json')));
  const content2 = JSON.parse(readFileSync(getPath('json2.json')));
  const result = readFileSync(getPath('json_result'), 'utf8');

  expect(genDiff(content1, content2)).toBe(result);
});
