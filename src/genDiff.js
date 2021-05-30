import _ from 'lodash';

export default (data1, data2) => {
  const rowAddPrefix = '  + ';
  const rowRemovePrefix = '  - ';
  const rowSharePrefix = '    ';

  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
  const diff = keys.reduce((acc, key) => {
    const rows = [...acc];
    const firstHas = _.has(data1, [key]);
    const secondHas = _.has(data2, [key]);

    if (firstHas && secondHas && data1[key] === data2[key]) {
      rows.push(`${rowSharePrefix}${key}: ${data1[key]}`);
    } else if (firstHas && secondHas) {
      rows.push(`${rowRemovePrefix}${key}: ${data1[key]}`);
      rows.push(`${rowAddPrefix}${key}: ${data2[key]}`);
    } else if (firstHas) {
      rows.push(`${rowRemovePrefix}${key}: ${data1[key]}`);
    } else {
      rows.push(`${rowAddPrefix}${key}: ${data2[key]}`);
    }

    return rows;
  }, []);

  diff.unshift('{');
  diff.push('}');

  return `\n${diff.join('\n')}\n`;
};
