const ApiBuilder = require('claudia-api-builder');
const mongoose = require('mongoose');
const api = new ApiBuilder();
const bluebird = require('bluebird');
const Todo = require('./model/todos');
const dbString = `mongodb://${process.env.DATABASE_USER}:${
  process.env.DATABASE_PASSWORD
}@ds237748.mlab.com:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

mongoose.Promise = bluebird;

/* api */
api.get('/hello', function() {
  return 'hello I am shura';
});

api.get('/greet', function(request) {
  const superb = require('superb');
  return request.queryString.name + ' is ' + superb();
});

/* database routes execution */
api.get('/todos', request => {
  const db = mongoose.connect(dbString).connection;
  db.once('open', () => {
    Todo.find()
      .then(todo => {
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
          },
          body: JSON.stringify(todo),
        };
      })
      .catch(err => {
        throw {
          err: err.message,
        };
      })
      .finally(() => {
        db.close();
      });
  });
});

api.get('/todo/{id}', request => {
  const db = mongoose.connect(dbString).connection;
  const { id } = request.pathParams;
  db.once('open', () => {
    Todo.findById({
      _id: id,
    })
      .then(todo => {
        return todo;
      })
      .catch(error => {
        throw {
          error: err.message,
        };
      })
      .finally(() => {
        db.close();
      });
  });
});

module.exports = api;
