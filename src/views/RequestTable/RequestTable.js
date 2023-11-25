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
  Button,
} from '@mui/material';

const RequestTable = ({ data }) => {
  // const [ngoFilter, setNgoFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');

  // Function to filter data based on NGO and project name
  const filteredData = data.filter((row) => {
    // const ngoMatch =
    //   row.ngoName.toLowerCase().includes(ngoFilter.toLowerCase()) ||
    //   ngoFilter === '';

    const projectMatch =
      row.projectName.toLowerCase().includes(projectFilter.toLowerCase()) ||
      projectFilter === '';

    return projectMatch;
  });

  const handleApprove = (index) => {
    // Implement your logic for handling approve/reject here
    console.log(`Button clicked for row ${index}`);
  };
  const handleReject = (index) => {
    // Implement your logic for handling approve/reject here
    console.log(`Button clicked for row ${index}`);
  };

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
                <TableCell>Requested Amount</TableCell>
                <TableCell>Available Amount</TableCell>
                <TableCell>Beneficiary Hash</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.projectName}</TableCell>
                  <TableCell>{row.requestedAmount}</TableCell>
                  <TableCell>{row.availableAmount}</TableCell>
                  <TableCell>{row.beneficiaryHash}</TableCell>
                  <TableCell>
                  <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleApprove(index)}
                      sx={{ marginRight: 1 }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleReject(index)}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Main>
  );
};

export default RequestTable;
