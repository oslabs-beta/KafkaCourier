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

// producer.on(producer.events.REQUEST, async (e) => {
  // const command = `kafka-consumer-groups --bootstrap-server ${server} --command-config server/cloud.properties --group my-group --describe`;
  // exec(command, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Error executing command: ${error.message}`);
  //     return;
  //   }
  
  //   if (stderr) {
  //     console.error(`Command stderr: ${stderr}`);
  //     return;
  //   }
  //   console.log("STDOUT: ", stdout);
  //   // console.log('columns', stdout.trim().split('\n'))
  //   // console.log("split: ", stdout.split(' '));
  //   stdout = stdout.split(' ');
  //   const values = [];
  //   const noWhiteSpace = stdout.forEach(el => {
  //     if (el !== '') values.push(el);
  //   });
  //   // console.log('values: ', values);
  // });
// });

const consumer1 = kafka.consumer({ groupId: 'my-group' });
const consumer2 = kafka.consumer({ groupId: 'my-group' });

// consumer1.on(consumer1.events.REQUEST, async (e) => {
//   const command = `kafka-consumer-groups --bootstrap-server ${server} --command-config server/cloud.properties --group my-group --describe`;
//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error executing command: ${error.message}`);
//       return;
//     }
  
//     if (stderr) {
//       console.error(`Command stderr: ${stderr}`);
//       return;
//     }
//     console.log("STDOUT: ", stdout);
//     console.log('columns', stdout.trim().split('\n'))
//     console.log("split: ", stdout.split(' '));
//     stdout = stdout.split(' ');
//     const values = [];
//     const noWhiteSpace = stdout.forEach(el => {
//       if (el !== '') values.push(el);
//     });
//     console.log('values: ', values);
//   });
// })

const myInterval = setInterval(() => {
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
    // console.log('columns', stdout.trim().split('\n'))
    // console.log("split: ", stdout.split(' '));
    stdout = stdout.split(' ');
    const values = [];
    const noWhiteSpace = stdout.forEach(el => {
      if (el !== '') values.push(el);
    });
    // console.log('values: ', values);
  });
}, 3000);

module.exports = {
  producer,
  consumer1,
  consumer2
};