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

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const RequestTable = ({ data }) => {
  console.log('i got', data)
  console.log(data[0])
  // const [projectFilter, setProjectFilter] = useState('');
  // const [approvalStatus, setApprovalStatus] = useState({});

  // const filteredData = data.filter((row) => {
  //   const projectMatch =
  //     row.projectName.toLowerCase().includes(projectFilter.toLowerCase()) ||
  //     projectFilter === '';

  //   return projectMatch;
  // });

  const handleApprove = (index) => {
    // Update approval status for the row
    setApprovalStatus((prevStatus) => ({ ...prevStatus, [index]: true }));
  };

  const handleReject = (index) => {
    // Update approval status for the row
    setApprovalStatus((prevStatus) => ({ ...prevStatus, [index]: false }));
  };

  return (
    <Main>
      {/* <Container>
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
                    {approvalStatus[index] === undefined ? (
                      <>
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
                      </>
                    ) : approvalStatus[index] ? (
                      <CheckCircleOutlineIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <HighlightOffIcon sx={{ color: 'error.main' }} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container> */}
    </Main>
  );
};

export default RequestTable;