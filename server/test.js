const { Kafka } = require('kafkajs');
require('dotenv').config();
const { exec } = require('child_process')
const { AssignerProtocol, Partitioners } = require('kafkajs');



// This creates a client instance that is configured to connect to the Kafka broker provided by
// the environment variable KAFKA_BOOTSTRAP_SERVER
const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password, KAFKA_SERVER: server } = process.env;
const sasl = username && password ? { username, password, mechanism: 'plain' } : null;
const ssl = !!sasl;

const kafka = new Kafka({
  clientId: 'qa-topic',
  brokers: [server],
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
  await producer.connect()
  await producer.send({
    topic: 'purchases',
    messages: [
      {
        value: Buffer.from(JSON.stringify(
          {
            "event_name": "QA",
            "payload": {
              "assessment": {
                "performance": 7,
                "quality": 7,
                "communication": 7,
                "flexibility": 7,
                "cost": 7,
                "delivery": 6
              }
            },
          }
        ))
      },
    ],
  })

  
  const consumer1 = kafka.consumer({ groupId: 'my-group' });
  await consumer1.connect()
  await consumer1.subscribe({ topic: 'purchases', fromBeginning: true })

  const consumer2 = kafka.consumer({ groupId: 'my-group' });
  await consumer2.connect()
  await consumer2.subscribe({ topic: 'purchases', fromBeginning: true })

  // const consumer3 = kafka.consumer({ groupId: 'my-group' });
  // await consumer3.connect()
  // await consumer3.subscribe({ topic: 'purchases', fromBeginning: true })

  // const consumers = [consumer1, consumer2, consumer3];
  // consumers.forEach(async consumer => {
  //   await consumer.run({
  //     eachMessage: async ({ topic, partition, message }) => {
  //       console.log('consumer: ', {
  //         partition,
  //         offset: message.offset,
  //         value: message.value.toString(),
  //       })
  //     },
  //   })
  // })

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


  

  await admin.connect();
  const result = await admin.fetchTopicMetadata();
  console.log('admin: ', result);

  const groups = await admin.listGroups();
  console.log('group: ', groups);

  const description = await admin.describeGroups(['my-group']);
  console.log('description: ', description);

  // const memArr = description.groups[0].members;
  // const memMetadata = memArr[0].memberMetadata;
  // const memAssignment = memArr[0].memberAssignment;
  // console.log('members array: ', memArr);
  // console.log('member metadata: ', memMetadata);
  // console.log(typeof memMetadata);

  // const memberMetadata = AssignerProtocol.MemberMetadata.decode(memMetadata)
  // const memberAssignment = AssignerProtocol.MemberAssignment.decode(memAssignment)
  // console.log(memberMetadata)
  // console.log(memberAssignment)

  // const offset = await admin.fetchTopicOffsets(memberMetadata.topics[0]);
  // console.log('offset: ', offset); 

  // console.log('member assignment: ', memAssignment);

  const command = `kafka-consumer-groups --bootstrap-server ${server} --command-config server/cloud.properties --group my-group --describe`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
  
    if (stderr) {
      console.error(`Command stderr: ${stderr}`);
      return;
    }
    
    console.log("STDOUT: ", stdout);
    console.log('columns', stdout.trim().split('\n'))
    console.log("split: ", stdout.split(' '));
    stdout = stdout.split(' ');
    const values = [];
    const noWhiteSpace = stdout.forEach(el => {
      if (el !== '') values.push(el);
    });
    console.log('values: ', values);

    /*
    CONSUMER GROUP 1
    'CLIENT-ID\nmy-group', -> my-group
    'purchases',
    '0',
    '1',
    '1',
    '0',
    'qa-topic-757dc242-17b4-45e1-aee5-b59c9e4f6ab9',
    '/104.35.164.169',
    *** 'qa-topic\nmy-group', -> qa-topic

    CONSUMER GROUP 2
    *** 'qa-topic\nmy-group', -> my-group
    'purchases',
    '2',
    '2',
    '2',
    '0',
    'qa-topic-757dc242-17b4-45e1-aee5-b59c9e4f6ab9',
    '/104.35.164.169',
    'qa-topic\nmy-group', -> qa-topic

    const groupData = [
      [*group 1 info*],
      [*group 2 info*]
    ]
    */

  });
}

run().catch(console.error);