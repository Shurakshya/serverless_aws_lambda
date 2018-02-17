const mongoose = require('mongoose'),
Schema = mongoose.Schema; 

const todosSchema = new mongoose.Schema({
	title : {
	  type : String,
    required: true
  },
	completed:{
		type:  Boolean,
		default : false
	}
});


mongoose.model('Todos', todosSchema);
