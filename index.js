const http = require('http');
const https = require('https');
const imageType = require('image-type');

module.exports = function(tgtURL) {
  const promise = new Promise((resolve, reject) => {
    if (tgtURL === undefined) { reject(new Error('No arguments'))}
    const protocol = tgtURL.substring(0, tgtURL.indexOf(':'));
    let f;
    if (protocol === 'http') {
      f = http;
    } else if (protocol === 'https') {
      f = https;
    } else {
      reject(new Error('Indeterminable'));
    }
    f.get(tgtURL, (res) => {
      let body = '';
      let type;
      res.on('data', (chunk) => {
        body += chunk;
        type = imageType(chunk) || type;
      });
      res.on('end', () => {
        if (type === undefined) {
          reject(new Error('Type unknown'));
        } else {
          const buf = new Buffer(body);
          const head = 'data:image/' + type.ext + ';base64,';
          resolve(head + buf.toString('base64'));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
  return promise;
}