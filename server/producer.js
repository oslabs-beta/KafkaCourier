const { Kafka } = require('kafkajs');
// import producer from './broker';
const { producer } = require('./broker');

const run = async () => {
    // Producing
    await producer.connect();
    // produce 100 messages
    const prodInterval = setInterval(async () => {
      for (let i = 0; i < 20; i++) {
        await producer.send({
          topic: 'purchases',
          messages: [
            {value: 'Hello Kafka'}
          ],
        });
      }
    }, 5000)
  }

run().catch(console.error);