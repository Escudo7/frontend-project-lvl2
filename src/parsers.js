import _ from 'lodash';
import yaml from 'js-yaml';

const parsers = {
  yml(content) {
    return this.yamlParser(content);
  },
  yaml(content) {
    return this.yamlParser(content);
  },
  yamlParser(content) {
    return yaml.load(content);
  },
  json(content) {
    return JSON.parse(content);
  },
};

export default (content, extension) => {
  const type = extension.replace('.', '').toLowerCase();

  if (!_.has(parsers, type)) {
    return '';
  }

  return parsers[type](content);
};
