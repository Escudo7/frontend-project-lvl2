import _ from 'lodash';

const generateCommonNode = (name, data1, data2, func) => {
  if (_.isEqual(data1[name], data2[name])) {
    return { name, value: data1[name] };
  }

  return _.isObject(data1[name]) && _.isObject(data2[name])
    ? { name, children: func(data1[name], data2[name]) }
    : { name, oldValue: data1[name], newValue: data2[name] };
};

const generateDifferenceNode = (name, data1, data2, firstHas) => (
  firstHas
    ? { name, oldValue: data1[name] }
    : { name, newValue: data2[name] }
);

const generate = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
  const createTree = (name) => {
    const firstHas = _.has(data1, [name]);
    const secondHas = _.has(data2, [name]);

    return firstHas && secondHas
      ? generateCommonNode(name, data1, data2, generate)
      : generateDifferenceNode(name, data1, data2, firstHas);
  };

  return _.flatMapDeep(keys, createTree);
};

export default generate;
