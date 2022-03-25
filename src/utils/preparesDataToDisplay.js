/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

export const prepareDataToDisplay = (data, customKey = 'emptyKey') => Object.keys(data).reduce(
  (obj, key) => {
    if (data[key] === null || data[key] === undefined) {
      obj[0][customKey][key] = '';
    } else if (typeof data[key] === 'object') {
      obj.push({ [key]: data[key] });
    } else {
      obj[0][customKey][key] = data[key];
    }
    return obj;
  },
  [{ [customKey]: {} }],
);
