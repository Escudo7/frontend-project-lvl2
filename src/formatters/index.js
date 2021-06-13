import renderStylish from './stylish.js';
import renderPlain from './plain.js';

export default (format) => {
  switch (format) {
    case 'stylish':
      return renderStylish;
    case 'plain':
      return renderPlain;
    default:
      return null;
  }
};
