const { Kafka } = require('kafkajs');
require('dotenv').config();
const { Partitioners, AssignerProtocol } = require('kafkajs');
const { exec } = require('child_process');

let admin;

const kafkaController = {
  // connect to kafka cluster and admin api in order to prefetch
  async connect(req, res, next) {
    try {
      // connect to kafka broker only if res.locals.rows contains nonempty array 
      // allows middleware to be used both when user does and doesn't exist in database
      if (res.locals.rows.length) {
        const { server, username, password } = res.locals;
        const sasl =
          username && password ? { username, password, mechanism: 'plain' } : null;
        const ssl = !!sasl;
        // This creates a client instance that is configured to connect to the Kafka broker
        const kafka = new Kafka({
          clientId: 'qa-topic',
          brokers: [server],
          logLevel: 2,
          ssl,
          sasl: {
            mechanism: 'plain',
            username,
            password,
          },
        });

        // connect to admin API
        admin = kafka.admin();
        admin.connect();
      }
      next();
    } catch (err) {
      console.log('Error in kafkaController.connect: ', err);
    }
  },

  async getTopicData(req, res, next) {
    try {
      // await admin.connect();
      // get topic names and # of partitions
      const topicData = await admin.fetchTopicMetadata();

      const formattedData = {
        topics: [],
        partitions: [],
        consumerGroups: [],
      };

      //RETRIEVE GROUP IDs
      const groups = await admin.listGroups();
      const groupArray = [];
      groups.groups.forEach((group) => {
        groupArray.push(group.groupId);
      });

      for (let i = 0; i < topicData.topics.length; i++) {
        // get topic names
        formattedData.topics.push(topicData.topics[i].name);
        // get # of partitions
        formattedData.partitions.push(topicData.topics[i].partitions.length);

        // get # of consumer groups
        const consumerGroupCount = await getConsumerGroups(
          topicData.topics[i].name,
          groupArray
        );
        formattedData.consumerGroups.push(consumerGroupCount);
        // formattedData.consumerGroups.push(groups.length);
      }

      res.locals.topicMetaData = formattedData;
      next();
    } catch (error) {
      console.log(error);
    }

    //function to retrieve consumer groups
    async function getConsumerGroups(topic, groupArray) {
      // //RETRIEVE GROUP IDs
      // const groups = await admin.listGroups();
      // const groupArray = [];
      // groups.groups.forEach((group) => {
      //   groupArray.push(group.groupId);
      // });

      //Pass GroupId array as arg
      const consumerGroups = await admin.describeGroups(groupArray);

      const topicConsumerGroups = consumerGroups.groups.filter((group) => {
        return group.members.some((member) =>
          AssignerProtocol.MemberAssignment.decode(
            member.memberAssignment
          ).assignment.hasOwnProperty(topic)
        );
      });

      return topicConsumerGroups.length;
    }
  },
  async getConsumerData(req, res, next) {
    try {
      // await admin.connect()
      const { consumerGroupId } = req.params;
      const consumers = await admin.describeGroups([consumerGroupId]);
      // create a result object to send to frontend
      let resultObj = {
        memberId: [],
        partitions: [],
      };
      // loop over consumer.groups[0].members
      consumers.groups[0].members.forEach((member) => {
        resultObj.memberId.push(member.memberId);
        resultObj.partitions.push(
          AssignerProtocol.MemberAssignment.decode(member.memberAssignment)
            .assignment
        );
      });
      // assign memeberId in objext
      // decode memberAssignment and access assignment property of the buffer and assign this to partition in result object
      //
      res.locals.consumerData = resultObj;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  async getConsumerDataCLI(req, res, next) {
    try {
      const { consumerGroupId } = req.params;
      const command = `kafka-consumer-groups --bootstrap-server ${server} --command-config server/cloud.properties --group ${consumerGroupId} --describe`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error.message}`);
          return;
        }

        if (stderr) {
          console.error(`Command stderr: ${stderr}`);
          return;
        }

        // console.log('STDOUT: ', stdout);
        let array = stdout.trim().split('\n');
        let lagArray = array[0].split(/\s+/).indexOf('LAG');
        let newArray2 = array.slice(1).map((line) => {
          const columns = line.split(/\s+/);
          return Number(columns[lagArray]);
        });
      });
      res.locals.consumerLag = newArray2;
      return next();
    } catch (error) {
      console.log(error);
      return next(error);
    }
  },
};

module.exports = kafkaController;
