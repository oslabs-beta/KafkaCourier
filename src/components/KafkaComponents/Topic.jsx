import React from 'react';
import './KafkaComponents.scss';

// row component to render within Topic
function TopicRow(props) {
  return (
    <tr>
      <td>{props.topicName}</td>
      <td>{props.partitions}</td>
      <td>{props.consumerGroups}</td>
    </tr>
  );
}

export default function Topic(props) {
  // api call to get topic data

  //function to procedurally display correct amount of rows based on data received from cluster
  /// THIS IS WHERE API DATA WILL GO
  console.log('props', props);
  // if (!props.topicData) {
  //   return <h1>No topic data yet</h1>;
  // }
  const topicData = JSON.parse(props.topicData);
  console.log('topicData', topicData);
  const topics = [];
  for (let i = 0; i < topicData.topics.length; i++) {
    topics.push(
      <TopicRow
        topicName={topicData.topics[i]}
        partitions={topicData.partitions[i]}
        consumerGroups={topicData.consumerGroups[i]}
      />
    );
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Topic Name</th>
          <th>Partitions</th>
          <th>Consumer Groups</th>
        </tr>
      </thead>
      <tbody>{topics}</tbody>
    </table>
  );
}
