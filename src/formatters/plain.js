import _ from 'lodash';

const objectValue = '[complex value]';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return objectValue;
  }

  return typeof value === 'string'
    ? `'${value}'`
    : value;
};

const renderer = (diffList, parentsList) => (
  diffList.flatMap((item) => {
    const propertyPath = [...parentsList, item.name].join('.');

    if (_.has(item, 'children')) {
      return renderer(item.children, [...parentsList, item.name]);
    }

    if (_.has(item, 'oldValue') && _.has(item, 'newValue')) {
      return `Property '${propertyPath}' was updated. From ${formatValue(item.oldValue)} to ${formatValue(item.newValue)}`;
    }

    if (_.has(item, 'oldValue')) {
      return `Property '${propertyPath}' was removed`;
    }

    if (_.has(item, 'newValue')) {
      return `Property '${propertyPath}' was added with value: ${formatValue(item.newValue)}`;
    }

    return [];
  })
);

export default (diff) => {
  const rows = renderer(diff, []);

  return `\n${rows.join('\n')}\n`;
};
