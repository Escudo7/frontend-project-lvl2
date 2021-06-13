import _ from 'lodash';

const rowAddPrefix = '  + ';
const rowRemovePrefix = '  - ';
const rowSharePrefix = '    ';

const renderObject = (obj, depth) => {
  const keys = Object.keys(obj);

  return _.flatMapDeep(keys, (key) => {
    if (_.isObject(obj[key])) {
      const data = [];
      data.push(`${rowSharePrefix.repeat(depth)}${key}: {`);
      data.push(renderObject(obj[key], depth + 1));
      data.push(`${rowSharePrefix.repeat(depth)}}`);

      return data;
    }

    return `${rowSharePrefix.repeat(depth)}${key}: ${obj[key]}`;
  });
};

const renderObjectDiff = (name, value, depth, rowPrefix) => {
  const data = [];
  data.push(`${rowSharePrefix.repeat(depth - 1)}${rowPrefix}${name}: {`);
  data.push(renderObject(value, depth + 1));
  data.push(`${rowSharePrefix.repeat(depth)}}`);

  return data;
};

const renderKeyDiff = (name, value, depth, rowPrefix) => (
  _.isObject(value)
    ? renderObjectDiff(name, value, depth, rowPrefix)
    : `${rowSharePrefix.repeat(depth - 1)}${rowPrefix}${name}: ${value}`
);

const renderer = (diffList, depth) => {
  const renderItem = (item) => {
    const newData = [];

    if (_.has(item, 'children')) {
      newData.push(`${rowSharePrefix.repeat(depth)}${item.name}: {`);
      newData.push(renderer(item.children, depth + 1));
      newData.push(`${rowSharePrefix.repeat(depth)}}`);
    }

    if (_.has(item, 'oldValue')) {
      newData.push(renderKeyDiff(item.name, item.oldValue, depth, rowRemovePrefix));
    }

    if (_.has(item, 'newValue')) {
      newData.push(renderKeyDiff(item.name, item.newValue, depth, rowAddPrefix));
    }

    if (_.has(item, 'value')) {
      newData.push(renderKeyDiff(item.name, item.value, depth, rowSharePrefix));
    }

    return newData;
  };

  return _.flatMapDeep(diffList, renderItem);
};

export default (diff) => {
  const rows = renderer(diff, 1);
  rows.unshift('{');
  rows.push('}');

  return `\n${rows.join('\n')}\n`;
};
