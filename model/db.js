const mongoose = require( 'mongoose' );
const {DATABASE_NAME,DATABASE_PASSWORD,DATABASE_USER,DATABASE_PORT} = require('../env');
let shutdown;

const dbURI= `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@ds155747.mlab.com:${DATABASE_PORT}/${DATABASE_NAME}`;
mongoose.connect(dbURI);

// monitoring mongoose connection events 
mongoose.connection.on('connected', function(){
	console.log('mongoose connected to' +dbURI);
});

mongoose.connection.on('error', function(err){
	console.log('mongoose connection error' +err);
});

mongoose.connection.on('disconnected', function(){
	console.log('mongoose disconnected');
});
