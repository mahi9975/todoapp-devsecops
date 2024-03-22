const express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    sanitizer = require('sanitizer'),
    app = express(),
    port = 8000;

// Add more colors for styling
const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
];

// Function to generate random color
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

let todolist = [];

app.set('view engine', 'ejs');

app.get('/todo', function (req, res) {
    res.render('todo.ejs', {
        todolist,
        clickHandler: "func1();"
    });
});

app.post('/todo/add/', function (req, res) {
    let newTodo = sanitizer.escape(req.body.newtodo);
    if (req.body.newtodo != '') {
        todolist.push({ text: newTodo, color: getRandomColor() });
    }
    res.redirect('/todo');
});

app.get('/todo/delete/:id', function (req, res) {
    if (req.params.id != '') {
        todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
});

app.get('/todo/:id', function (req, res) {
    let todoIdx = req.params.id;
    let todo = todolist[todoIdx];

    if (todo) {
        res.render('edititem.ejs', {
            todoIdx,
            todo,
            clickHandler: "func1();"
        });
    } else {
        res.redirect('/todo');
    }
});

app.put('/todo/edit/:id', function (req, res) {
    let todoIdx = req.params.id;
    let editTodo = sanitizer.escape(req.body.editTodo);
    if (todoIdx != '' && editTodo != '') {
        todolist[todoIdx].text = editTodo;
    }
    res.redirect('/todo');
});

app.use(function (req, res, next) {
    res.redirect('/todo');
});

app.listen(port, function () {
    console.log(`Todolist running on http://0.0.0.0:${port}`);
});

module.exports = app;

