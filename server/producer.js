const { Kafka } = require('kafkajs');
// import producer from './broker';
const { producer } = require('./broker');

const run = async () => {
    // Producing
    await producer.connect();
    await producer.send({
      topic: 'purchases',
      messages: [
        {value: 'Hello Kafka'}
      ],
    });
  }

run().catch(console.error);