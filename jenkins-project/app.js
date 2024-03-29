const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

let todos = [];

// Routes
app.get('/', (req, res) => {
  res.render('todo', { todos: todos });
});

app.post('/add', (req, res) => {
  const todo = req.body.todo;
  todos.push(todo);
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  const todo = todos[id];
  res.render('edititem', { id: id, todo: todo });
});

app.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  const updatedTodo = req.body.todo;
  todos[id] = updatedTodo;
  res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  todos.splice(id, 1);
  res.redirect('/');
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
