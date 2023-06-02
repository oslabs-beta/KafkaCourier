const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const kafkaController = require('./controllers/kafkaController');
const userController = require('./controllers/userController');

const io = require('socket.io')(3001, {
  cors: {
    origin: ['https://kafka-courier-i5rn.onrender.com'],
  },
});

io.on('connection', (socket) => {
  console.log('socket id: ', socket.id);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const PORT = 3000;

// keep track of emitting intervals so they can be cleared
const intervals = [];
const rateInterval = [];

app.use(express.static(path.join(__dirname, '../dist')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

// create user
app.post(
  '/api/createUser',
  userController.createUser,
  kafkaController.connect,
  async (req, res) => {
    res.status(200).json(res.locals.rows);
  }
);

// validate user
app.get(
  '/api/checkUser/:user',
  userController.checkUser,
  kafkaController.connect,
  async (req, res) => {
    res.status(200).json(res.locals.rows);
  }
);

// if user has an existing session, re-connect to kafka instance
app.use(userController.checkUser, kafkaController.connect);

// get topic data
app.get('/api/topic', kafkaController.getTopicData, (req, res, next) => {
  res.status(200).json(res.locals.topicMetaData);
});

// get consumer group data
app.get(
  '/api/consumerData/:consumerGroupId',
  kafkaController.getConsumerData,
  (req, res, next) => {
    // function to send events via web sockets
    const emitter = async (groupId) => {
      const consumerLag = await kafkaController.getConsumerDataCLI(
        req.params.consumerGroupId
      );
      io.emit(groupId, consumerLag);
    };
    emitter(req.params.consumerGroupId);
    // clear any running intervals and add interval id to intervals array to allow it to be cleared later
    // ensures only one interval is running at a time with simultaneous connections
    intervals.forEach((interval) => clearInterval(interval));
    intervals.push(setInterval(emitter, 7000, req.params.consumerGroupId));
    next();
  },
  (req, res) => {
    res.status(200).json(res.locals.consumerData);
  }
);

let previousOffset = null;
let previousTime = null;

// get consumption rate data for consumer group
app.get('/api/consumptionRate', (req, res) => {
  const { consumerGroup, topic } = req.query;
  const emitter = async () => {
    const { rate, updatedOffset, updatedTime } =
      await kafkaController.getConsumerConsumption(
        consumerGroup,
        topic,
        previousOffset,
        previousTime
      );
    previousOffset = updatedOffset;
    previousTime = updatedTime;
    io.emit('consumption rate', rate);
  };
  rateInterval.forEach((interval) => clearInterval(interval));
  rateInterval.push(setInterval(emitter, 1000));
  res.status(200).send('Consumption rate is being sent to frontend');
});

// catch-all route for errors
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

// express global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
