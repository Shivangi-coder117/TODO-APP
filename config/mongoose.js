 // require library
 const mongoose = require('mongoose');

 // connect database
 mongoose.connect('mongodb://localhost/todo-list-db');

 // acquire the connection
 const db = mongoose.connection;

 // error
 db.on('error', console.error.bind(console, "Error connecting to database."));

 // up and running
 db.once('open', function(){
     console.log("Successfully connected to the database.");
 });
 