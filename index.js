const fetch = require('isomorphic-fetch');
const zip = require('lodash.zip');

const pageExists = url => {
  return fetch(url).then(result => result.ok).catch(() => false);
};

module.exports = url => {
  if (!(typeof url === 'string' && url.length !== 0)) {
    return Promise.reject(new Error('URL is required'));
  }
  return pageExists(url);
};

module.exports.many = urls => {
  if (!Array.isArray(urls)) {
    return Promise.reject(new TypeError(`Expected an array, got ${typeof urls}`));
  }

  return Promise.all(urls.map(pageExists)).then(
    result => new Map(zip(urls, result))
  );
};
