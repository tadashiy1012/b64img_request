const assert = require('power-assert');
const request = require('../index.js');

const testURL1 = 'https://www.google.co.jp/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
const testURL2 = 'http://k.yimg.jp/c/icon/s/bsc/2.0/loco20.gif';
const testURL3 = 'http://k.yimg.jp/images/video-topics/rec/1605/31_03.jpg';

describe('b64img_request test', () => {
  it('Pattern of arguments expected A', (done) => {
    request(testURL1).then((result) => {
      assert(result !== undefined);
      assert(typeof result === 'string');
      assert('png' === result.substring(result.indexOf('/') + 1, result.indexOf(';')));
      done();
    });
  });
  it('Pattern of arguments expected B', (done) => {
    request(testURL2).then((result) => {
      assert(result !== undefined);
      assert('gif' === result.substring(result.indexOf('/') + 1, result.indexOf(';')));
      done();
    });
  });
  it('Pattern of arguments expected C', (done) => {
    request(testURL3).then((result) => {
      assert(result !== undefined);
      assert('jpg' === result.substring(result.indexOf('/') + 1, result.indexOf(';')));
      done();
    });
  });
  it('Pattern of not as expected argument A', (done) => {
    request('hogehoge.jpg').catch((err) => {
      assert(err !== undefined);
      assert(err.message === 'Indeterminable');
      done();
    });
  });
  it('Pattern of not as expected argument B', (done) => {
    request().catch((err) => {
      assert(err !== undefined);
      assert(err.message === 'No arguments');
      done();
    });
  });
  it('Pattern of not as expected argument C', (done) => {
    request('https://www.google.co.jp').catch((err) => {
      assert(err !== undefined);
      assert(err.message === 'Type unknown');
      done();
    });
  });
});