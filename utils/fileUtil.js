import { readFileSync } from 'fs';

module.exports = {
  loadJSON
};

function loadJSON(path) {
  return JSON.parse(readFileSync(path));
};
