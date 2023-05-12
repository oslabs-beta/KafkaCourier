const express = require('express');
const app = express();
const path = require('path');
const { Kafka } = require('kafkajs')
const kafkaController = require('./controllers/kafkaController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

//serve static files
app.use(express.static(path.join(__dirname, './src')));

// get topic data
app.get('/api/topic', kafkaController.getTopicData, (req, res, next) => {
  res.json('It worked');
})

//catch-all route for errors 
app.get('*', (req, res) => {
  res.sendStatus(404);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});