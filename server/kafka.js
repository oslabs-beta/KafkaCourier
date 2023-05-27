const { Kafka } = require("kafkajs");
const { metricize } = require("kafkajs-metrics");

require("dotenv").config();
const { Partitioners, AssignerProtocol } = require("kafkajs");

// This creates a client instance that is configured to connect to the Kafka broker provided by
// the environment variable KAFKA_BOOTSTRAP_SERVER
const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env;
const sasl =
  username && password ? { username, password, mechanism: "plain" } : null;
const ssl = !!sasl;

const kafka = new Kafka({
  clientId: "qa-topic",
  brokers: ["pkc-6ojv2.us-west4.gcp.confluent.cloud:9092"],
  logLevel: 2,
  ssl,
  sasl: {
    mechanism: "plain",
    username,
    password,
  },
});
metricize(kafka);

// let previousOffset = null;
// let previousTime = null;
// let counter = 0; // Move this line here

// const getConsumptionRate = async () => {
//   const offsets = await admin.fetchOffsets({
//     groupId: "group2",
//     topic: "returns",
//   });
//   console.log(offsets[0].partitions, "OFFSETS HERER");
//   const totalOffset = offsets[0].partitions.reduce(
//     (total, { offset }) => total + Number(offset),
//     0
//   );
//   console.log("totalOffset", totalOffset);
//   const currentTime = Date.now();
//   if (counter !== 0) {
//     // console.log("TOTAL OFFSET", totalOffset);
//     // console.log("PREV OFFSET", previousOffset);
//     const offsetDifference = totalOffset - previousOffset;
//     const timeDifference = (currentTime - previousTime) / 1000; // to give time in seconds
//     const rate = offsetDifference / timeDifference;
//     console.log(`Consumption rate: ${rate} messages/second`);
//   }
//   previousOffset = totalOffset;
//   previousTime = currentTime;
//   counter++; // This is now outside of the 'if' block
// };
// setInterval(getConsumptionRate, 15);
const admin = kafka.admin();

admin.connect();

// const producer = kafka.producer({
//   createPartitioner: Partitioners.LegacyPartitioner,
// });
const producer = kafka.producer();
producer.on("producer.connect", () => {
  console.log(`KafkaProvider: connected`);
});
producer.on("producer.disconnect", () => {
  console.log(`KafkaProvider: could not connect`);
});
producer.on("producer.network.request_timeout", (payload) => {
  console.log(`KafkaProvider: request timeout ${payload.clientId}`);
});
const run = async () => {
  // Producing
  await producer.connect();
  for (let i = 0; i < 100; i++) {
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
  const consumer1 = kafka.consumer({ groupId: "group2" });
  await consumer1.connect();
  await consumer1.subscribe({ topic: "returns", fromBeginning: true });

  //SECOND CONSUMER
  // const consumer2 = kafka.consumer({ groupId: 'group2' });
  // await consumer2.connect();
  // await consumer2.subscribe({ topic: 'returns', fromBeginning: true });

  // console.log('kafka: ', kafkaMetricsObject);
  // console.log('consumer1: ', consumer1.metrics);

  await consumer1.run({
    eachMessage: async ({ topic, partition, message }) => {
      // console.log({
      //   value: message.value.toString(),
      // });
      await new Promise((resolve) => setTimeout(resolve, 40));
    },
  });

  const consumers = await admin.describeGroups(["group2"]);
  console.log("members", consumers.groups[0].members);
  console.log(
    "before member assignment ",
    AssignerProtocol.MemberAssignment.decode(
      consumers.groups[0].members[0].memberAssignment
    )
  );
  console.log(
    "member assignment ",
    AssignerProtocol.MemberAssignment.decode(
      consumers.groups[0].members[0].memberAssignment
    ).assignment
  );

  // const kafkaMetricsObject = kafka.metrics;
  // console.log("METRICS OBJECT", kafkaMetricsObject);
  // console.log("CONSUMERs", consumer1.metrics);

  // const offsets = await admin.fetchOffsets({
  //   groupId: "group2",
  //   topic: "returns",
  // });
  // console.log(offsets);

  // const offsets = await admin.fetchOffsets({
  //   groupId: "group2",
  //   topic: "returns",
  // });
  // console.log("OFFSET", offsets[0].partitions);
};

run().catch(console.error);
