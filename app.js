require('dotenv').config()

const express = require('express')
const path = require('path')
const bodyParser= require('body-parser')
const nunjucks  = require('nunjucks')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const methodOverride = require('method-override')
const auth = require('http-auth')
const authConnect = require('http-auth-connect')
const dbConfig = process.env.MONGO_URI
const username = process.env.ADMIN_USER
const password = process.env.ADMIN_PASSWORD

const basic = auth.basic({
  realm: 'You needz password to modify database'
}, (username, password, callback) => {
  callback(username == username && password == password)
})

const app = express()
app.use(authConnect(basic))

const libraries = [
  { name: 'Ang Mo Kio Public Library' },
  { name: 'Bedok Public Library' },
  { name: 'Bishan Public Library' },
  { name: 'Bukit Batok Public Library' },
  { name: 'Bukit Merah Public Library' },
  { name: 'Bukit Panjang Public Library' },
  { name: 'Central Public Library' },
  { name: 'Cheng San Public Library' },
  { name: 'Choa Chu Kang Public Library' },
  { name: 'Clementi Public Library' },
  { name: 'Geylang East Public Library' },
  { name: 'Jurong Regional Library' },
  { name: 'Jurong West Public Library' },
  { name: 'library@chinatown' },
  { name: 'library@esplanade' },
  { name: 'library@orchard' },
  { name: 'Marine Parade Public Library' },
  { name: 'Lee Kong Chian Reference Library Lvl 7' },
  { name: 'Lee Kong Chian Reference Library Lvl 8' },
  { name: 'Lee Kong Chian Reference Library Lvl 9' },
  { name: 'Pasir Ris Public Library' },
  { name: 'Queenstown Public Library' },
  { name: 'Sembawang Public Library' },
  { name: 'Sengkang Public Library' },
  { name: 'Serangoon Public Library' },
  { name: 'Tampines Regional Library' },
  { name: 'Toa Payoh Public Library' },
  { name: 'Woodlands Regional Library' },
  { name: 'Yishun Public Library' }
]

let db

MongoClient.connect(dbConfig, (err, database) => {
  if (err) return console.log(err)
  db = database.db('library')
  app.listen(process.env.PORT || 1845, function() {
    console.log('listening on ' + process.env.PORT)
  })
})

app.set('views', path.join(__dirname, 'views'))
const env = nunjucks.configure(app.get('views'), {
  autoescape: true,
  express: app
})
app.set('view engine', 'html')

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  db.collection('books').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index', {
      libraries: libraries,
      books: result
    })
  })
})

app.get('/modify', (req, res) => {
  db.collection('books').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('modify', {
      libraries: libraries,
      books: result
    })
  })
})

app.post('/books', (req, res) => {
  db.collection('books').save(req.body, (err) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/modify')
  })
})

app.get('/book/:id', (req, res) => {
  const query = {'_id': ObjectId(req.params.id)}
  db.collection('books').findOne(query, function(err, book) {
    console.log(book)
    if (err) return console.log(err)
    res.render('edit', {
      libraries: libraries,
      book: book
    })
  })
})

app.put('/book/:id', function(req, res) {
  const query = {'_id': ObjectId(req.params.id)}
  const update = {
    title: req.body.title,
    dewey_decimal: req.body.dewey_decimal,
    available_at: req.body.available_at,
    borrowed: req.body.borrowed
  }
  const options = { new: true }
  db.collection('books').findOneAndUpdate(query, update, options, function(err) {
    if (err) return console.log(err)
    console.log('entry updated')
    res.redirect('/modify')
  })
})

app.delete('/book/:id', function(req, res) {
  const query = {'_id': ObjectId(req.params.id)}
  db.collection('books').findOneAndDelete(query, function(err, book) {
    console.log(book)
    res.redirect('/modify')
  })
})
