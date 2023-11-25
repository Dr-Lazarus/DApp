// DataTable.js
import React, { useState } from 'react';
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

const ViewRequestTable = ({ data }) => {
  const [ngoFilter, setNgoFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');

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
        <TextField
          label="Filter by NGO"
          value={ngoFilter}
          onChange={(e) => setNgoFilter(e.target.value)}
          margin="normal"
        />
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
                <TableCell>NGO Name</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.ngoName}</TableCell>
                  <TableCell>{row.projectName}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell style={{ color: row.status === 'Approved' ? 'green' : 'red' }}>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Main>
  );
};

export default ViewRequestTable;
