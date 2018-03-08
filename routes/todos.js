var express = require('express');
var router = express.Router();
var model = require('../models/index');

/* GET todo listing. */
router.get('/', function(req, res, next) {
  console.log('22222')
  model.Todo.findAll({})
    .then(todos => res.json({
      error: false,
      data: todos
    }))
    .catch(error => res.json({
      error: true,
      data: [],
      error: error
    }));
});


/* POST todo. */
router.post('/', function(req, res, next) {
  const {
    title,
    description
  } = req.body;
  model.Todo.create({
    title: title,
    description: description
  }).then(todo => res.status(201).json({
    error: false,
    data: todo,
    message: 'New todo has been created.'
  }))
  .catch(error => res.json({
    error: true,
    data: [],
    error: error
  }));
});


/* update todo. */
router.put('/:id', function(req, res, next) {
  const todo_id = req.params.id;
  const {
    title,
    description
  } = req.body;
  model.Todo.update({
    title: title,
    description: description
  }, {
    where: {
      id: todo_id
    }
  })
    .then(todo => res.status(201).json({
      error: false,
      message: 'todo has been updated.'
    }))
    .catch(error => res.json({
      error: true,
      data: [],
      error: error
    }));
});


/* DELETE todo. */
router.delete('/:id', function(req, res, next) {
  const todo_id = req.params.id;
  console.log(todo_id, '-----------------')
  model.Todo.destroy({where: {
    id: todo_id
  }})
    .then(status => res.status(201).json({
      error: false,
      message: 'todo has been delete.'
    }))
    .catch(error => res.json({
      error: true,
      error: error
    }));
});

module.exports = router;