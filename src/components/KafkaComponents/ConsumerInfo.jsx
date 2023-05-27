import React, {useState, useEffect} from 'react';
import axios from "axios"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function ConsumerInfo() {
  const[data, setData] = useState({});

  useEffect(() => {
    fetchConsumerData();
    // const fetchData = async(consumerGroupId) => {
    //   // const result = await axios(`/api/consumerData/${consumerGroupId}`);
    //   // group2 is hard coded, replace with group name
    //   const result = await axios(`/api/consumerData/group2`);
    //   console.log('Consumer info data', result.data)
    //   setData(result.data);
    // }
    // fetchData();

  })


  async function fetchConsumerData() {
    
    try {
      const response = await fetch(`/api/consumerData/group2`)
      if(response.ok) {
        const data = await response.json();
        console.log('fetched consumer data', data);
        setData(data);
      }
      else {
        throw new Error('Request failed');
      }
    }
    catch(err) {
      console.log('An error occured: ', err);
    }
  }


  const res = [];
  if(data.memberId && data.partitions){
    console.log('DATA', data)
    for (let i = 0; i < data.memberId.length; i++) {
      res.push(<TableRow>
        <TableCell>{data.memberId[i]}</TableCell>
        <TableCell>{data.partitions[i].returns.join()}</TableCell>
      </TableRow>)
    }   
  }


  return (
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Consumer</TableCell>
                    <TableCell>Partitions Subscribed To</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {res}
            </TableBody>
        </Table>
    </TableContainer>
  )
}


