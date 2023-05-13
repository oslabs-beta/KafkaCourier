const { Kafka } = require('kafkajs');
require('dotenv').config();
const { Partitioners } = require('kafkajs');

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

const admin = kafka.admin();

const kafkaController = {
  async getTopicData(req, res, next) {
    try {
      await admin.connect();
      const topicData = await admin.fetchTopicMetadata();
      console.log('admin: ', topicData.topics);
      const groups = await admin.listGroups();
      console.log('group: ', groups);
      const formattedData = {
        topics: [],
        partitions: [],
        consumerGroups: [],
      };
      for (let i = 0; i < topicData.topics.length; i++) {
        // get topic names
        formattedData.topics.push(topicData.topics[i].name);
        // get # of partitions
        formattedData.partitions.push(topicData.topics[i].partitions.length);
        // get # of consumer groups
        // formattedData.consumerGroups.push(groups.length);
      }
      console.log('formattedData: ', formattedData);
      res.locals.topicMetaData = formattedData;
      next();
    } catch (error) {
      console.log(error);
    }
  },

  async getPartitionData(req, res, next) {
    next();
  },
};

//   run().catch(console.error);

module.exports = kafkaController;

// const data = {
//     topics: [name1, name2, name2],
//     partitions: [6, 1, 4],
//     consumerGroups: [1, 1, 1],
// }
