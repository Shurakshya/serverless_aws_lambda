const ApiBuilder = require('claudia-api-builder'),
  mongoose = require('mongoose'),
  api = new ApiBuilder();
const Todo = require('./model/todos');

/* connect to db */
const dbString = `mongodb://${process.env.DATABASE_USER}:${
  process.env.DATABASE_PASSWORD
}@ds237748.mlab.com:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
mongoose.connect(dbString);

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
  try {
    Todo.find((err, todo) => {
      if (err) {
        throw err;
      } else {
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
          },
          body: JSON.stringify(todo),
        };
      }
    });
  } catch (error) {
    return {
      error: error.message,
    };
  }
});

api.get('/todo/{id}', request => {
  try {
    const db = mongoose.connect(dbString).connection;
    const { id } = request.pathParams;
    db.once('open', () => {
      return Todo.findById({
        _id: id,
      }).exec((err, todo) => {
        if (err) {
          throw err;
        } else {
          return todo;
        }
      });
    });
  } catch (error) {
    throw {
      error,
    };
  }
});

module.exports = api;
