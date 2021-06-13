import _ from 'lodash';

const generate = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
  const createTree = (name) => {
    const firstHas = _.has(data1, [name]);
    const secondHas = _.has(data2, [name]);

    if (firstHas && !secondHas) {
      return { name, oldValue: data1[name] };
    }

    if (!firstHas && secondHas) {
      return { name, newValue: data2[name] };
    }

    if (_.isEqual(data1[name], data2[name])) {
      return { name, value: data1[name] };
    }

    if (!_.isObject(data1[name]) || !_.isObject(data2[name])) {
      return {
        name,
        oldValue: data1[name],
        newValue: data2[name],
      };
    }

    return { name, children: generate(data1[name], data2[name]) };
  };

  return _.flatMapDeep(keys, createTree);
};

export default generate;
