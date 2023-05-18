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
    const fetchData = async(consumerGroupId) => {
      // const result = await axios(`/api/consumerData/${consumerGroupId}`);
      // group2 is hard coded, replace with group name
      const result = await axios(`/api/consumerData/group2`);
      console.log('Consumer info data', result.data)
      setData(result.data);
    }
    fetchData();

  },[])

  const res = [];
  if(data.memberId && data.partitions){
    console.log('DATA', data)
    for (let i = 0; i < data.memberId.length; i++) {
      res.push(<TableRow>
        <TableCell>{data.memberId[i]}</TableCell>
        // returns is hardcoded replace with topic
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
            {res}
        </Table>
    </TableContainer>
  )
}


