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

const render = (diffList, depth) => (
  diffList.reduce((acc, item) => {
    const newData = [];

    if (_.has(item, 'children')) {
      newData.push(`${rowSharePrefix.repeat(depth)}${item.name}: {`);
      newData.push(render(item.children, depth + 1));
      newData.push(`${rowSharePrefix.repeat(depth)}}`);
    }

    if (_.has(item, 'oldValue')) {
      if (_.isObject(item.oldValue)) {
        newData.push(`${rowSharePrefix.repeat(depth - 1)}${rowRemovePrefix}${item.name}: {`);
        newData.push(renderObject(item.oldValue, depth + 1));
        newData.push(`${rowSharePrefix.repeat(depth)}}`);
      } else {
        newData.push(`${rowSharePrefix.repeat(depth - 1)}${rowRemovePrefix}${item.name}: ${item.oldValue}`);
      }
    }

    if (_.has(item, 'newValue')) {
      if (_.isObject(item.newValue)) {
        newData.push(`${rowSharePrefix.repeat(depth - 1)}${rowAddPrefix}${item.name}: {`);
        newData.push(renderObject(item.newValue, depth + 1));
        newData.push(`${rowSharePrefix.repeat(depth)}}`);
      } else {
        newData.push(`${rowSharePrefix.repeat(depth - 1)}${rowAddPrefix}${item.name}: ${item.newValue}`);
      }
    }

    if (_.has(item, 'value')) {
      if (_.isObject(item.newValue)) {
        newData.push(`${rowSharePrefix.repeat(depth)}${item.name}: {`);
        newData.push(renderObject(item.value, depth + 1));
        newData.push(`${rowSharePrefix.repeat(depth)}}`);
      } else {
        newData.push(`${rowSharePrefix.repeat(depth)}${item.name}: ${item.value}`);
      }
    }

    const newDataFlatted = newData.flat();

    return [...acc, ...newDataFlatted];
  }, [])
);

export default (diff) => {
  const rows = render(diff, 1);
  rows.unshift('{');
  rows.push('}');

  return `\n${rows.join('\n')}\n`;
};
