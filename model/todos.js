const mongoose = require('mongoose'),
Schema = mongoose.Schema; 

const todosSchema = mongoose.model('Todos', {
	title : {
	  type : String,
    required: true
  },
	completed:{
		type:  Boolean,
		default : false
	}
});



module.exports = todosSchema;
