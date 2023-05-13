const { Kafka } = require('kafkajs');
require('dotenv').config();
const { Partitioners } = require('kafkajs');

// This creates a client instance that is configured to connect to the Kafka broker provided by
// the environment variable KAFKA_BOOTSTRAP_SERVER
const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env;
const sasl = username && password ? { username, password, mechanism: 'plain' } : null;
const ssl = !!sasl;

const kafka = new Kafka({
  clientId: 'qa-topic',
  brokers: ['pkc-6ojv2.us-west4.gcp.confluent.cloud:9092'],
  logLevel: 2,
  ssl,
  sasl: {
    mechanism: 'plain',
    username,
    password
  }
})

const admin = kafka.admin()

const kafkaController = {
    async getTopicData () {
        try {
            await admin.connect();
            const result = await admin.fetchTopicMetadata();
            console.log('admin: ', result.topics[0].partitions);
            const groups = await admin.listGroups();
            console.log('group: ', groups);
        }
        catch (error) {
            console.log(error);
        }
    }
}
     
    //   run().catch(console.error);

module.exports = kafkaController;