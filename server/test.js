const { Kafka } = require('kafkajs');
require('dotenv').config();
const { AssignerProtocol, Partitioners } = require('kafkajs');


// This creates a client instance that is configured to connect to the Kafka broker provided by
// the environment variable KAFKA_BOOTSTRAP_SERVER
const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env;
const sasl = username && password ? { username, password, mechanism: 'plain' } : null;
const ssl = !!sasl;

const kafka = new Kafka({
  clientId: 'qa-topic',
  brokers: ['pkc-4r087.us-west2.gcp.confluent.cloud:9092'],
  logLevel: 2,
  ssl,
  sasl: {
    mechanism: 'plain',
    username,
    password
  }
})

const admin = kafka.admin()


// const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
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
//   // Producing
//   await producer.connect()
//   await producer.send({
//     topic: 'supplier-ratings',
//     messages: [
//       {
//         value: Buffer.from(JSON.stringify(
//           {
//             "event_name": "QA",
//             "payload": {
//               "assessment": {
//                 "performance": 7,
//                 "quality": 7,
//                 "communication": 7,
//                 "flexibility": 7,
//                 "cost": 7,
//                 "delivery": 6
//               }
//             },
//           }
//         ))
//       },
//     ],
//   })

  
  const consumer = kafka.consumer({ groupId: 'my-group' });
  await consumer.connect()
  await consumer.subscribe({ topic: 'purchases', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('consumer: ', {
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })

  await admin.connect();
  const result = await admin.fetchTopicMetadata();
  console.log('admin: ', result);

  const groups = await admin.listGroups();
  console.log('group: ', groups);

  const description = await admin.describeGroups(['my-group']);
  console.log('description: ', description);

  const memArr = description.groups[0].members;
  const memMetadata = memArr[0].memberMetadata;
  const memAssignment = memArr[0].memberAssignment;
  console.log('members array: ', memArr);
  console.log('member metadata: ', memMetadata);
  console.log(typeof memMetadata);

  const memberMetadata = AssignerProtocol.MemberMetadata.decode(memMetadata)
  const memberAssignment = AssignerProtocol.MemberAssignment.decode(memAssignment)
  console.log(memberMetadata)
  console.log(memberAssignment)

  const offset = await admin.fetchTopicOffsets(memberMetadata.topics[0]);
  console.log('offset: ', offset); 

  console.log('member assignment: ', memAssignment);
}

run().catch(console.error);