const ApiBuilder = require('claudia-api-builder'),
  mongoose = require('mongoose'),
  api = new ApiBuilder();

/* connect to db */
const dbURI = `mongodb://${process.env.DATABASE_USER}:${
  process.env.DATABASE_PASSWORD
}@ds155747.mlab.com:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

mongoose.connect(dbURI);

const todosCtrl = require('./controller/todosCtrl');

/* api */
api.get('/hello', function() {
  return 'hello I am shura';
});

api.get('/greet', function(request) {
  const superb = require('superb');
  return request.queryString.name + ' is ' + superb();
});

/* database routes execution */
api.get('/todos', todosCtrl.getTodos);
api.get('/todo/{id}', todosCtrl.getTodo);

module.exports = api;
