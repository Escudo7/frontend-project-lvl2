import { test, expect } from '@jest/globals';
import genDiff from '../src/genDiff.js';
import { readFileSync } from "fs";

test('genDiff', () => {
  const content1 = JSON.parse(readFileSync('__fixtures__/json1.json'));
  const content2 = JSON.parse(readFileSync('__fixtures__/json2.json'));
  const result = readFileSync('__fixtures__/json_result', 'utf8');

  expect(genDiff(content1, content2)).toBe(result);
});
