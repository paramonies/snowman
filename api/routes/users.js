const { Router } = require('express')

const router = Router()

// Mock Users
const users = [
  { name: 'Alexandre' },
  { name: 'Pooya' },
  { name: 'Sébastien' }
]


var mongoose = require('mongoose')
var usersSchema = new mongoose.Schema({
  name: String
})
var User = mongoose.model('user', usersSchema)
mongoose.connect('mongodb://localhost/snowman', {useNewUrlParser: true})
var db = mongoose.connection;



/* GET users listing. */
router.get('/users', function (req, res, next) {
  User.find(function (err, docs) {
    res.json(docs)
  })
  // res.json(users)
})

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, docs) {
    res.json(docs)
  })
  // const id = parseInt(req.params.id)
  // if (id >= 0 && id < users.length) {
  //   res.json(users[id])
  // } else {
  //   res.sendStatus(404)
  // }
})

router.post('/users/add', function (req, res, next) {
  User.create({ name: req.body.name }, function (err, result) {
    // res.json(result)
    User.find(function (err, docs) {
      res.json(docs)
    })
  })
  
})

module.exports = router
