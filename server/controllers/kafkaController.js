const { Kafka } = require("kafkajs");
require("dotenv").config();
const { Partitioners, AssignerProtocol } = require("kafkajs");
const { exec } = require("child_process");

let admin;
let server;
let username;
let password;
// pkc-6ojv2.us-west4.gcp.confluent.cloud:9092
// module.exports = function(io) {
//   // ...your controller functions here, which can now use the `io` object...
// };

const kafkaController = {
  // connect to kafka cluster and admin api in order to prefetch
  async connect(req, res, next) {
    try {
      // connect to kafka broker only if res.locals.rows contains nonempty array
      // allows middleware to be used both when user does and doesn't exist in database
      if (res.locals.rows.length) {
        ({ server, username, password } = res.locals);

        console.log(server, username, password);

        const sasl =
          username && password
            ? { username, password, mechanism: "plain" }
            : null;
        const ssl = !!sasl;
        // This creates a client instance that is configured to connect to the Kafka broker
        const kafka = new Kafka({
          clientId: "qa-topic",
          brokers: [server],
          logLevel: 2,
          ssl,
          sasl: {
            mechanism: "plain",
            username,
            password,
          },
        });

        // connect to admin API
        admin = kafka.admin();
        admin.connect();
        console.log("connecting to admin");
      }
      next();
    } catch (err) {
      console.log("Error in kafkaController.connect: ", err);
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

  // async getConsumerDataCLI(req, res, next) {
  //   try {
  //     const { consumerGroupId } = req.params;
  //     let newArray2 = [];
  //     const command = `kafka-consumer-groups --bootstrap-server pkc-6ojv2.us-west4.gcp.confluent.cloud:9092 --command-config server/cloud.properties --group ${consumerGroupId} --describe`;
  //     exec(command, (error, stdout, stderr) => {
  //       if (error) {
  //         console.error(`Error executing command: ${error.message}`);
  //         return;
  //       }

  //       if (stderr) {
  //         console.error(`Command stderr: ${stderr}`);
  //         return;
  //       }

  //       // console.log('STDOUT: ', stdout);
  //       let array = stdout.trim().split('\n');
  //       console.log("array.length: ",array.length);
  //       let lagArray = array[0].split(/\s+/).indexOf('LAG');
  //       console.log('lag array', lagArray);
  //       newArray2 = array.slice(1).map((line) => {
  //         const columns = line.split(/\s+/);
  //         return Number(columns[lagArray]);
  //       })
  //         .filter(el => {
  //           if (!isNaN(el)) return el;
  //         });
  //       console.log('newArray2: ', newArray2);
  //       let maxNum = Math.max(...newArray2)
  //       let resultArray = [{x: Date.now(), y: maxNum}]
  //       // io.emit('consumer Data', resultArray)
  //       res.locals.consumerLag = resultArray;
  //       return next();
  //     });
  //     // console.log('newArray2: ', newArray2);
  //     // let maxNum = Math.max(...newArray2)
  //     // let resultArray = [{x: Date.now(), y: maxNum}]
  //     // // io.emit('consumer Data', resultArray)
  //     // res.locals.consumerLag = resultArray;
  //     // return next();
  //   } catch (error) {
  //     console.log('error: ', error);
  //     return next(error);
  //   }
  // },

  getConsumerDataCLI: function (consumerGroupId) {
    try {
      return new Promise((resolve, reject) => {
        let newArray2 = [];
        const command = `kafka-consumer-groups --bootstrap-server pkc-6ojv2.us-west4.gcp.confluent.cloud:9092 --command-config server/cloud.properties --group ${consumerGroupId} --describe`;
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
          const array = stdout.trim().split("\n");
          console.log("array.length: ", array.length);
          const lagArray = array[0].split(/\s+/).indexOf("LAG");
          console.log("lag array", lagArray);
          newArray2 = array
            .slice(1)
            .map((line) => {
              const columns = line.split(/\s+/);
              return Number(columns[lagArray]);
            })
            .filter((el) => {
              if (!isNaN(el)) return el;
            });
          console.log("newArray2: ", newArray2);
          const maxNum = Math.max(...newArray2);
          console.log("max number", maxNum);

          const getCurrentTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            const seconds = now.getSeconds().toString().padStart(2, "0");
            const currentTime = Number(`${hours}${minutes}${seconds}`);
            return currentTime;
          };

          const resultArray = { x: getCurrentTime(), y: maxNum };
          // io.emit('consumer Data', resultArray)
          console.log("resultArray: ", resultArray);
          return resolve(resultArray);
        });
        // console.log('newArray2: ', newArray2);
        // let maxNum = Math.max(...newArray2)
        // let resultArray = [{x: Date.now(), y: maxNum}]
        // // io.emit('consumer Data', resultArray)
        // res.locals.consumerLag = resultArray;
        // return next();
      });
    } catch (error) {
      console.log("error: ", error);
      reject(error);
    }
  },

  async getConsumerConsumption(
    groupId,
    topic,
    previousOffset = null,
    previousTime = null
  ) {
    let rate = 0;
    const offsets = await admin.fetchOffsets({
      groupId,
      topic,
    });
    console.log(offsets[0].partitions, "OFFSETS HERER");
    const totalOffset = offsets[0].partitions.reduce(
      (total, { offset }) => total + Number(offset),
      0
    );
    console.log("totalOffset", totalOffset);
    const currentTime = Date.now();
    if (previousOffset !== null && previousTime !== null) {
      // console.log("TOTAL OFFSET", totalOffset);
      // console.log("PREV OFFSET", previousOffset);
      const offsetDifference = totalOffset - previousOffset;
      const timeDifference = (currentTime - previousTime) / 1000; // to give time in seconds
      rate = offsetDifference / timeDifference;
      console.log(`Consumption rate: ${rate} messages/second`);
    }
    previousOffset = totalOffset;
    previousTime = currentTime;
    return {
      rate,
      updatedOffset: totalOffset,
      updatedTime: currentTime,
    };
  },
};

module.exports = kafkaController;
