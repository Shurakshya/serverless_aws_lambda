const mongoose = require('mongoose');
require('../model/todos');
const db = mongoose.model('Todos');

// get all todos
const getTodos = (request)=>{
  return db.find()
    .exec((err,todo)=>{
      if(err){
        throw err;
      }else{
        return todo;
      }
    });
};

//get a todo
const getTodo=(request)=>{
  const {id} = request.pathParams;
  return db.findById({
    _id : id
  })
    .exec((err,todo)=>{
      if(err){
        throw err;
      }else{
        return todo;
      }
    });
};

module.exports={
  getTodos,
  getTodo
}
