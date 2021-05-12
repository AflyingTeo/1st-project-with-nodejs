const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

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

app.get('/', (req, res) => res.render('index',{ title: 'Home'}));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})