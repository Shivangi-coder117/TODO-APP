const express = require('express');

// PORT NUMBER
const port = 8008;

// CREATE DATABASE
const db = require('./config/mongoose');

// OBJECT
const app = express();

// Get the path object
const path = require('path');

// Importing TODO objects
const Todo = require('./models/todo');

// Decoding
app.use(express.urlencoded());

// USING EJS 
app.set('view engine', 'ejs');

// Seting path
app.set('views', path.join(__dirname, 'views'));

// Css & js
app.use(express.static('assets'));

// Home
app.get('/', function (req, res) {
    Todo.find({}, function (err, todos) {
        if (err) {
            console.log('error', err);
            return;
        }
        return res.render('home',
            {
                title: "TODO APP",
                todo_list: todos
            }
        );
    });    
});

// Create Task
app.post('/create-todo', function (req, res) {
    Todo.create({
            description: req.body.description,
            category: req.body.category,
            date: req.body.date
        }, function (err, newtodo) {
            if (err) {
                console.log('error in creating task', err);
                return;
            }
            return res.redirect('back');
        }
    )
});

// Delete for single task
app.get('/delete_todo_single', function(req, res) {
    let id = req.query.id;
    Todo.findByIdAndDelete(id, function(err){
        if(err) {
            console.log("error");
            return;
        }
        return res.redirect('back');
    });
});

// Delete for multiple task
app.post('/delete-todo', function(req, res) {
    let ids = req.body.task;
    // if single task is to be deleted
    if (typeof(ids) == "string") {
        Todo.findByIdAndDelete(ids, function(err) {
            if (err) { 
                console.log("error in deleting"); 
                return; 
            }
        });
    } else {    // if multiple task is to be deleted
        for (let i = 0; i < ids.length; i++) {
            Todo.findByIdAndDelete(ids[i], function (err) {
                if (err) { 
                    console.log("error in deleting");
                    return; 
                }
            });
        }
    }
    return res.redirect('back');
});

// SERVER
app.listen(port, function(err) {
    if(err) {
        console.log("Error in setting up the express server!");
    }
    console.log("Express server is up and running on port:", port);
});