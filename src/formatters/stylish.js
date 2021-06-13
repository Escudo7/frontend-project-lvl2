import _ from 'lodash';

const rowAddPrefix = '  + ';
const rowRemovePrefix = '  - ';
const rowSharePrefix = '    ';

const renderObject = (obj, depth) => {
  const keys = Object.keys(obj);

  return _.flatMapDeep(keys, (key) => {
    if (_.isObject(obj[key])) {
      const startRow = `${rowSharePrefix.repeat(depth)}${key}: {`;
      const middleRows = renderObject(obj[key], depth + 1);
      const endRow = `${rowSharePrefix.repeat(depth)}}`;

      return [startRow, middleRows, endRow];
    }

    return `${rowSharePrefix.repeat(depth)}${key}: ${obj[key]}`;
  });
};

const renderObjectDiff = (name, value, depth, rowPrefix) => {
  const startRow = `${rowSharePrefix.repeat(depth - 1)}${rowPrefix}${name}: {`;
  const middleRows = renderObject(value, depth + 1);
  const endRow = `${rowSharePrefix.repeat(depth)}}`;

  return [startRow, middleRows, endRow];
};

const renderKeyDiff = (name, value, depth, rowPrefix) => (
  _.isObject(value)
    ? renderObjectDiff(name, value, depth, rowPrefix)
    : `${rowSharePrefix.repeat(depth - 1)}${rowPrefix}${name}: ${value}`
);

const renderer = (diffList, depth) => {
  const renderItem = (item) => {
    if (_.has(item, 'children')) {
      const startRow = `${rowSharePrefix.repeat(depth)}${item.name}: {`;
      const middleRows = renderer(item.children, depth + 1);
      const endRow = `${rowSharePrefix.repeat(depth)}}`;

      return [startRow, middleRows, endRow];
    }

    if (_.has(item, 'value')) {
      return renderKeyDiff(item.name, item.value, depth, rowSharePrefix);
    }

    if (_.has(item, 'oldValue') && _.has(item, 'newValue')) {
      const oldRow = renderKeyDiff(item.name, item.oldValue, depth, rowRemovePrefix);
      const newRow = renderKeyDiff(item.name, item.newValue, depth, rowAddPrefix);

      return [oldRow, newRow];
    }

    if (_.has(item, 'oldValue')) {
      return renderKeyDiff(item.name, item.oldValue, depth, rowRemovePrefix);
    }

    if (_.has(item, 'newValue')) {
      return renderKeyDiff(item.name, item.newValue, depth, rowAddPrefix);
    }

    return [];
  };

  return _.flatMapDeep(diffList, renderItem);
};

export default (diff) => {
  const rows = ['{', ...renderer(diff, 1), '}'];

  return `${rows.join('\n')}`;
};
