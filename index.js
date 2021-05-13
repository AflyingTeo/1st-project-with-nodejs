const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const shortId = require('shortid');

//Set Default For LowDB
db.defaults({ user: [] })
  .write();
//Midlleware bodyparser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//Use template enegines Pug
app.set('view engine', 'pug');

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// })
// app.get('/', function (req, res) {
//     res.render('index', { title: 'Hey', message: 'Hello there!' })
// }
// var users = [
//   {name: 'user1'},
//   {name: 'user2'},
//   {name: 'user3'},
//   {name: 'user4'},
//   {name: 'user5'},
// ];

app.get('/', (req, res) => res.render('index',{ title: 'Home'}));
app.get('/user', (req, res) => res.render('users/index',{users : db.get('user').value()}));
app.get('/user/search', function(req, res){
  var q = req.query.q;
  var users = db.get('user').value();
  var matchedUsers = users.filter(function(user){
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('users/index',
  { users: matchedUsers,
    searchedValue: q,
  })
});
app.get('/user/create', function(req, res){
  res.render('users/create')
})
app.post('/user/create', function(req, res){
  req.body.id = shortId.generate();
  db.get('user').push(req.body).write();
  res.redirect('/user');
})

app.get('/user/:id', function(req, res){
  var id = req.params.id;
  // console.log(id)
  // console.log(typeof id)
  var users = db.get('user').find({ id: id }).value();
  // console.log(users)
  res.render('users/view', {users: users});
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})