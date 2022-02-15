const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require ("body-parser")
const mySecret = process.env['PW']

const mongoose = require('mongoose');
let uri = 'mongodb+srv://Admin-Gerald:' + mySecret+'@helix.vzrxf.mongodb.net/FreeCodeDB'

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors())

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

let exerciseSessionSchema = new mongoose.Schema({
  desciption: {type: String, required: true},
  duration: {type: Number, required: true},
  date: String
})

let userSchema = new mongoose.Schema({
  username: {type: String, requred: true},
  log: [exerciseSessionSchema]
})

let Session = mongoose.model('Session', exerciseSessionSchema)

let User = mongoose.model('User', userSchema)

app.post('/api/exercise/new-user', bodyParser.urlencoded({ extended: false }), (req, res) => {
  let newUser = new User({username: req.body.username})
  newUser.save((error, savedUser) =>{
    if(!error){
      let responseObject = {}
      responseObject['username'] = savedUser.username
      responseObject['_id'] = savedUser.id
      res.json(responseObject)
    }
  })
  res.json({})
})

// app.get("api/exercise/users")