const { Kafka } = require('kafkajs');
const { metricize } = require('kafkajs-metrics')

require('dotenv').config();
const { Partitioners, AssignerProtocol } = require('kafkajs');

// This creates a client instance that is configured to connect to the Kafka broker provided by
// the environment variable KAFKA_BOOTSTRAP_SERVER
const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env;
const sasl =
  username && password ? { username, password, mechanism: 'plain' } : null;
const ssl = !!sasl;

const kafka = new Kafka({
  clientId: 'qa-topic',
  brokers: ['pkc-6ojv2.us-west4.gcp.confluent.cloud:9092'],
  logLevel: 2,
  ssl,
  sasl: {
    mechanism: 'plain',
    username,
    password,
  },
});

metricize(kafka);
const kafkaMetricsObject = kafka.metrics;

const admin = kafka.admin();

// const producer = kafka.producer({
//   createPartitioner: Partitioners.LegacyPartitioner,
// });
const producer = kafka.producer();
producer.on('producer.connect', () => {
  console.log(`KafkaProvider: connected`);
});
producer.on('producer.disconnect', () => {
  console.log(`KafkaProvider: could not connect`);
});
producer.on('producer.network.request_timeout', (payload) => {
  console.log(`KafkaProvider: request timeout ${payload.clientId}`);
});
const run = async () => {
  // Producing
  await producer.connect();
  for (let i = 0; i < 1000; i++) {
    await producer.send({
      topic: 'returns',
      messages: [
        {
          value: Buffer.from(
            JSON.stringify({
              event_name: 'QA',
              payload: {
                assessment: {
                  performance: 7,
                  quality: 7,
                  communication: 7,
                  flexibility: 7,
                  cost: 7,
                  delivery: 6,
                },
              },
            })
          ),
        },
      ],
    });
  }

  //FIRST CONSUMER
  const consumer1 = kafka.consumer({ groupId: 'group2' });
  await consumer1.connect();
  await consumer1.subscribe({ topic: 'returns', fromBeginning: true });

  //SECOND CONSUMER
  // const consumer2 = kafka.consumer({ groupId: 'group2' });
  // await consumer2.connect();
  // await consumer2.subscribe({ topic: 'returns', fromBeginning: true });

  // console.log('kafka: ', kafkaMetricsObject);
  // console.log('consumer1: ', consumer1.metrics);

  await consumer1.run({});
  // await consumer2.run({
  
    // console.log('METRICS: ', consumer.metrics)
    // eachMessage: async ({ topic, partition, message }) => {
    //   console.log('consumer2: ', {
    //     partition,
    //     offset: message.offset,
    //     value: message.value.toString(),
    //   });
    // },
  // });
  const consumers = await admin.describeGroups(['group2'])
  console.log('members', consumers.groups[0].members) 
  console.log('before member assignment ', AssignerProtocol.MemberAssignment.decode(consumers.groups[0].members[0].memberAssignment));
  console.log('member assignment ', AssignerProtocol.MemberAssignment.decode(consumers.groups[0].members[0].memberAssignment).assignment);
};

run().catch(console.error);
