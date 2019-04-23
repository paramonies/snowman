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
    if (docs) {
      res.json(docs)
    } else {
      res.sendStatus(404)
    }
  })
})

router.post('/users/add', function (req, res, next) {
  User.create({ name: req.body.name }, function (err, result) {
    User.find(function (err, docs) {
      res.json(docs)
    })
  })
})

router.post('/users/remove', function (req, res, next) {
  User.deleteOne({ _id: req.body._id }, function (err) {
    res.json(200)
  })
})

module.exports = router
