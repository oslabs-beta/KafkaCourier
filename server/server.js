const express = require('express');
const app = express();
const path = require('path');
const { Kafka } = require('kafkajs');

const kafkaController = require('./controllers/kafkaController');
const userController = require('./controllers/userController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

//serve static files
app.use(express.static(path.join(__dirname, './src')));

//create user
app.post('/api/createUser', 
  userController.createUser,
  kafkaController.connect,
  async (req, res) => {
    res.status(200).json(res.locals.rows);
});

app.get('/api/checkUser/:user',
  userController.checkUser,
  kafkaController.connect, 
  async (req, res) => {
    res.status(200).json(res.locals.rows);
  }
);

// get topic data
app.get('/api/topic', 
  kafkaController.getTopicData, 
  (req, res, next) => {
    res.status(200).json(res.locals.topicMetaData);
  }
);

// get consumer data
app.get('/api/consumerData/:consumerGroupId', 
  kafkaController.getConsumerData, 
  (req, res, next) => {
    res.status(200).json(res.locals.consumerData);
  }
)

// catch-all route for errors
app.get('*', (req, res) => {
  res.sendStatus(404);
});

// express global error handler

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
