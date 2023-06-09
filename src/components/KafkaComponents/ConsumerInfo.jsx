import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export default function ConsumerInfo({ consumerGroup }) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchConsumerData();
  }, []);


  async function fetchConsumerData() {
    try {
      const response = await fetch(`/api/consumerData/${consumerGroup}`);
      if (response.ok) {
        const data = await response.json();
        console.log('fetched consumer data', data);
        setData(data);
      } else {
        throw new Error('Request failed');
      }
    } catch (err) {
      console.log('An error occured: ', err);
    }
  }

  const res = [];
  if (data.memberId && data.partitions) {
    console.log('DATA', data);
    for (let i = 0; i < data.memberId.length; i++) {
      res.push(
        <TableRow key={i}>
          <TableCell>{data.memberId[i]}</TableCell>
          <TableCell>{data.partitions[i].returns.join()}</TableCell>
        </TableRow>
      );
    }
  }

  return (
    <TableContainer id="consumer-info">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Consumer</TableCell>
            <TableCell>Partitions Subscribed To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{res}</TableBody>
      </Table>
    </TableContainer>
  );
}
