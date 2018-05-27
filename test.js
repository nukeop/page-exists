import test from 'ava';
import uniqueString from 'unique-string';
import pageExists from '.';

const validCodes = [200, 201, 202, 203, 204, 205, 301, 302, 303, 307, 308];

const invalidCodes = [100, 101, 102, 300, 304, 305, 306, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 422, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 511, 520, 522, 524];

test('return true when a page exists', async t => {
  t.true(await pageExists('https://duckduckgo.com'));
});

test('return false when a page at the URL doesn\'t exist', async t => {
  t.false(await pageExists(`http://www.${uniqueString()}.com`));
});

test('return a map for multiple urls', async t => {
  const result = await pageExists.many([
    'https://httpstat.us/200',
    'https://httpstat.us/404',
    'https://httpstat.us/200',
    'https://httpstat.us/500',
    'https://httpstat.us/401'
  ]);
  t.true(result.get('https://httpstat.us/200'));
  t.false(result.get('https://httpstat.us/404'));
  t.false(result.get('https://httpstat.us/500'));
  t.false(result.get('https://httpstat.us/401'));
});

validCodes.forEach(code => {
  test(`return true on ${code} HTTP code`, async t => {
    t.true(await pageExists(`https://httpstat.us/${code}`));
  });
});

invalidCodes.forEach(code => {
  test(`return false on ${code} HTTP code`, async t => {
    t.false(await pageExists(`https://httpstat.us/${code}`));
  });
});
