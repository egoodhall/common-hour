import { readFileSync } from 'fs';

const loadJSON = (path) => {
  return JSON.parse(readFileSync(path));
};

export {
  loadJSON
};
