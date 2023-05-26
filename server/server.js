const express = require('express');
const app = express();
const path = require('path');
const { Kafka } = require('kafkajs');
const cookieParser = require('cookie-parser');

const io = require('socket.io')(3001, {
  cors: {
    origin: ['http://localhost:8080'],
  },
});

io.on('connection', (socket) => {
  console.log('socket id: ', socket.id);
  // socket.on('event', obj => {
  //   console.log('obj: ', obj);
  // })
});
const repeat = () => {
  io.emit('event', {
    a: 100,
  });
};

setInterval(repeat, 2000);

const kafkaController = require('./controllers/kafkaController');
const userController = require('./controllers/userController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const PORT = 3000;

//serve static files
app.use(express.static(path.join(__dirname, './src')));

// app.get('/*', )

//create user
app.post(
  '/api/createUser',
  userController.createUser,
  kafkaController.connect,
  async (req, res) => {
    res.status(200).json(res.locals.rows);
  }
);

app.get(
  '/api/checkUser/:user',
  userController.checkUser,
  kafkaController.connect,
  async (req, res) => {
    res.status(200).json(res.locals.rows);
  }
);

app.use(userController.checkUser, kafkaController.connect);

app.put(
  '/api/updateUser',
  userController.updateUser,
  kafkaController.connect,
  async (req, res) => {
    res.sendStatus(200);
  }
);

// get topic data
app.get('/api/topic', kafkaController.getTopicData, (req, res, next) => {
  res.status(200).json(res.locals.topicMetaData);
});

// catch-all route for errors
app.get('*', (req, res) => {
  res.sendStatus(404);
});

// express global error handler

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
