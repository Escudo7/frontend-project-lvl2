import renderStylish from './stylish.js';
import renderPlain from './plain.js';
import renderJson from './json.js';

export default (format) => {
  switch (format) {
    case 'stylish':
      return renderStylish;
    case 'plain':
      return renderPlain;
    case 'json':
      return renderJson;
    default:
      return null;
  }
};
