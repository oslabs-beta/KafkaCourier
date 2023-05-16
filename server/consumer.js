const { Kafka } = require('kafkajs');
const { consumer1, consumer2 } = require('./broker');

const run = async () => {
  await consumer1.connect()
  await consumer1.subscribe({ topic: 'purchases', fromBeginning: true })

  await consumer2.connect()
  await consumer2.subscribe({ topic: 'purchases', fromBeginning: true })

  await consumer1.run({
    eachMessage: async ({ topic, partition, message }) => {
      await new Promise(resolve => setTimeout(resolve,5000));
      console.log('consumer: ', {
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  });

  await consumer2.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('consumer: ', {
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  });
}

run().catch(console.error);