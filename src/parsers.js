import _ from 'lodash';
import yaml from 'js-yaml';

const parsers = {
  yml: (content) => parsers.yamlParser(content),
  yaml: (content) => parsers.yamlParser(content),
  yamlParser: (content) => yaml.load(content),
  json: (content) => JSON.parse(content),
};

export default (content, extension) => {
  const type = extension.replace('.', '').toLowerCase();

  if (!_.has(parsers, type)) {
    return '';
  }

  return parsers[type](content);
};
