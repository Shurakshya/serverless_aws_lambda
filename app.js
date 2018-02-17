const ApiBuilder = require('claudia-api-builder'),
  mongoose = require('mongoose'),
  api = new ApiBuilder();
require('./model/db');

/* api */
api.get('/hello', function () {
  return 'hello I am shura';
});

api.get('/greet', function (request) {
  const superb = require('superb');
  return request.queryString.name + ' is ' + superb();
});


module.exports = api;


