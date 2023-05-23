const express = require('express');
const app = express();
const path = require('path');
const { Kafka } = require('kafkajs');
// const { createServer } = require('http');
// const { Server } = require('socket.io');

// const web
// const io = new Server();
const io = require('socket.io')(3001, {
  cors: {
    origin: ['http://localhost:8080'],
  },
});

io.on('connection', socket => {
  console.log('socket id: ', socket.id);
  // socket.on('event', obj => {
  //   console.log('obj: ', obj);
  // })
 
});
const repeat =  () => {
  io.emit('event', {
    a: 100
  });
};

setInterval(repeat, 2000);

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

// app.get('/api/consumerData/:consumerGroupId', 
//   kafkaController.getConsumerData, 
//   (req, res, next) => {

//     res.status(200).json(res.locals.consumerData);
//   }
// )

app.get('/api/consumerData/:consumerGroupId', 
  kafkaController.getConsumerData,  
  (req, res, next) => {
    // io.emit....
    const emitter = async (groupId) => {
      const consumerLag = await new Promise((resolve, reject) => {
        kafkaController.getConsumerDataCLI(req.params.consumerGroupId, (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });
        
      console.log('consumerLag: ', consumerLag);
      io.emit(groupId, consumerLag);
    }
    
    setInterval(emitter, 7000, req.params.consumerGroupId);

    next();
  },
  (req, res) => {
    res.status(200).json(res.locals.consumerData);
  }
)

// app.get(
//   '/api/consumerData/:consumerGroupId',
//   kafkaController.getConsumerData,
//   async (req, res, next) => {
//     const emitter = async (groupId) => {
//       try {
//         const consumerLag = await kafkaController.getConsumerDataCLI(req.params.consumerGroupId);
//         console.log('consumerLag:', consumerLag);
//         io.emit(groupId, consumerLag);
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     setInterval(() => emitter(req.params.consumerGroupId), 7000);

//     next();
//   },
//   (req, res) => {
//     res.status(200).json(res.locals.consumerData);
//   }
// );






// // In your server code
// app.get('/api/consumerData/:consumerGroupId', 
//   (req, res, next) => {
        // kafkaController.getConsumerDataCLI
        // 
//    },
//   async (req, res, next) => {
//     // Send initial response
//     res.status(200).json({message: "Started consumer data fetch."});

//     setInterval(async () => {
//       try {
//         await kafkaController.getConsumerDataCLI;
//         io.emit('consumerData', res.locals.consumerLag);
//       } catch (error) {
//         console.log(error);
//       }
//     }, 5000);
//   }
// );

// In your server code
// app.get('/api/consumerData/:consumerGroupId', 
//   async (req, res, next) => {
//     // Send initial response
//     res.status(200).json({message: "Started consumer data fetch."});

//     setInterval(async () => {
//       try {
//         await kafkaController.getConsumerDataCLI(req, res, next);
//         io.emit('consumerData', res.locals.consumerLag);
//       } catch (error) {
//         console.log(error);
//       }
//     }, 5000);
//   }
// );


// catch-all route for errors
app.get('*', (req, res) => {
  res.sendStatus(404);
});

// express global error handler

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
