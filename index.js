require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const userRoute = require('./Routes/user.route');
const authRoute = require('./Routes/auth.route');
const productsRoute = require('./Routes/products.route');
const cookieParser = require('cookie-parser');
//Midlleware bodyparser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//cookies parser
app.use(cookieParser(process.env.SECSION_SECRET));
//Use template enegines Pug
app.set('view engine', 'pug');
app.use(express.static('public'))

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

app.use('/users', userRoute);
app.use('/auth', authRoute);
app.use('/products', productsRoute);
app.get('/', (req, res) => res.render('index',{ title: 'Home'}));



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})