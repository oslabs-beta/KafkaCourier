import React, {useState, useEffect} from 'react';
import axios from "axios"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function ConsumerInfo() {
  const[data, setData] = useState([])

  useEffect(() => {
    const fetchData = async(consumerGroupId) => {
      // const result = await axios(`/api/consumerData/${consumerGroupId}`);
      const result = await axios(`/api/consumerData/group2`);
      setData(result.data);
    }
    fetchData();

  },[])
  return (
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Consumer</TableCell>
                    <TableCell>Partitions Subscribed To</TableCell>
                    <TableCell>Heartbeat</TableCell>
                </TableRow>
            </TableHead>
        </Table>
    </TableContainer>
  )
}


