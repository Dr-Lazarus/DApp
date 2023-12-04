// DataTable.js
import React, { useEffect, useState } from 'react';
import Main from 'layouts/Main';
import Container from 'components/Container';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from '@mui/material';


const DataTable = ({ data }) => {
  // const [data1, setData] = useState([]);
  // setData(data)
  console.log('i got hs', data)
  console.log('my lenght', data.length)
  const [ngoFilter, setNgoFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');

  // useEffect(()=>{

  // },[data1])

  // Function to filter data based on NGO and project name
  const filteredData = data.filter((row) => {
    const ngoMatch =
      row.ngoName.toLowerCase().includes(ngoFilter.toLowerCase()) ||
      ngoFilter === '';

    const projectMatch =
      row.projectName.toLowerCase().includes(projectFilter.toLowerCase()) ||
      projectFilter === '';

    return ngoMatch && projectMatch;
  });

  return (
    <Main>
      <Container>
        {/* Filter input fields */}
        {/* <TextField
          label="Filter by NGO"
          value={ngoFilter}
          onChange={(e) => setNgoFilter(e.target.value)}
          margin="normal"
        /> */}
        <TextField
          label="Filter by Project Name"
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          margin="normal"
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                {/* <TableCell>NGO Name</TableCell> */}
                <TableCell>Amount</TableCell>
                <TableCell>Donor/Beneficiary Address</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.projectName}</TableCell>
                  {/* <TableCell>{row.ngoName}</TableCell> */}
                  <TableCell style={{ color: row.type === 'Donation' ? 'green' : 'red' }}>
                    {row.amount}
                  </TableCell>
                  <TableCell>{row.sendOrRecAddr}</TableCell>
                  <TableCell>{row.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Main>
  );
};

export default DataTable;
