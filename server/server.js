const express = require('express');
const app = express();
const path = require('path');
const { Kafka } = require('kafkajs')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;




//serve static files
app.use(express.static(path.join(__dirname, './src')));

app.get('*', (req, res) => {
  console.log('something');
  res.sendFile(path.join(__dirname, '../src/index.html'));
});



//API routes
//home route will need middleware to check ifLoggedIn ??



// app.get('/home', (req, res) => {
//     console.log("hello!")
//     res.sendFile(path.join(__dirname, '../src/index.html'))
//     console.log('sent File')
// })

// app.get('/hello', (req, res) => {
//     console.log('connected')
//     res.send('hello');
// })

// // app.get('/addUser', (req, res) => {
// //   { user, server, key, secret } = req.body;
// //   // add to database
// // })

// app.get('/credentials', (req, res) => {
//   res.sendFile(path.join(__dirname, '../src/index.html'))
// })








// start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});