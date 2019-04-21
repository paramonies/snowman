const { Router } = require('express')

const router = Router()


var mongoose = require('mongoose')
var usersSchema = new mongoose.Schema({
  name: String
})
var User = mongoose.model('user', usersSchema)
mongoose.connect('mongodb://localhost/snowman', {useNewUrlParser: true})
var db = mongoose.connection;



router.get('/users', function (req, res, next) {
  User.find(function (err, docs) {
    res.json(docs)
  })
})

router.get('/users/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, docs) {
    res.json(docs)
  })
})

router.post('/users/add', function (req, res, next) {
  User.create({ name: req.body.name }, function (err, result) {
    User.find(function (err, docs) {
      res.json(docs)
    })
  })
})

module.exports = router
