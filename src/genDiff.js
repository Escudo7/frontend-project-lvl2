import _ from 'lodash';

export default (data1, data2) => {
  const rowAddPrefix = '  + ';
  const rowRemovePrefix = '  - ';
  const rowSharePrefix = '    ';

  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
  const diff = keys.reduce((acc, key) => {
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

  return `\n${diff.join('\n')}\n`;
};
