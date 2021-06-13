import _ from 'lodash';

const generate = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
  const diff = keys.reduce((acc, key) => {
    const item = { name: key };
    const firstHas = _.has(data1, [key]);
    const secondHas = _.has(data2, [key]);

    if (firstHas && !secondHas) {
      item.oldValue = data1[key];
    } else if (!firstHas && secondHas) {
      item.newValue = data2[key];
    } else if (_.isEqual(data1[key], data2[key])) {
      item.value = data1[key];
    } else if (!_.isObject(data1[key]) || !_.isObject(data2[key])) {
      item.oldValue = data1[key];
      item.newValue = data2[key];
    } else {
      item.children = generate(data1[key], data2[key]);
    }

    return [...acc, item];
  }, []);

  return diff;
};

export default generate;
