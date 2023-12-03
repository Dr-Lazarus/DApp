import React, { useState } from "react";
import Main from "layouts/Main";
import Container from "components/Container";
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
} from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FundraiserContract from "contracts/Fundraiser.json";
const cc = require("cryptocompare");
import Web3 from "web3";
import { Web } from "@mui/icons-material";
import detectEthereumProvider from "@metamask/detect-provider";

const RequestTable = ({ data }) => {
  const [projectFilter, setProjectFilter] = useState("");
  const [approvalStatus, setApprovalStatus] = useState({});

  const filteredData = data.filter((row) => {
    console.log("Data:", row.status);
    const projectMatch =
      row.projectName.toLowerCase().includes(projectFilter.toLowerCase()) ||
      projectFilter === "";

    return projectMatch;
  });

  const handleApprove = async (row) => {
    try {
      const exchangeRate = await cc.price("ETH", ["USD"]);
      const ethAmount = row.requestedAmount / exchangeRate.USD; // Convert USD to ETH
      const provider = await detectEthereumProvider();
      if (!provider) {
        console.log("Please install MetaMask!");
        return;
      }
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(
        FundraiserContract.abi,
        row.fundInstance._address
      );

      // Use the first account to send the transaction
      const fromAddress = accounts[0];

      // Estimate Gas (optional step for better UX)
      const gasEstimate = await contract.methods
        .approveRequest(1)
        .estimateGas({ from: fromAddress });

      const receipt = await contract.methods.approveRequest(1).send({
        from: fromAddress,
        gas: gasEstimate,
      });
      setApprovalStatus((prevStatus) => ({
        ...prevStatus,
        [row.requestId]: true,
      }));
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReject = (index) => {
    // Update approval status for the row
    setApprovalStatus((prevStatus) => ({ ...prevStatus, [index]: false }));
  };

  return (
    <Main>
      <Container>
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
                <TableCell>Project Names</TableCell>
                <TableCell>Request ID</TableCell>
                <TableCell>Sr</TableCell>
                <TableCell>Requested Amount</TableCell>
                <TableCell>Total Donated Amount</TableCell>
                <TableCell>Beneficiary Address</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.projectName}</TableCell>
                  <TableCell>{row.requestID}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>${row.requestedAmount}</TableCell>
                  <TableCell>${row.availableAmount}</TableCell>
                  <TableCell>{row.beneficiaryHash}</TableCell>
                  <TableCell>
                    {approvalStatus[index] === undefined ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleApprove(row)}
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
                      <CheckCircleOutlineIcon sx={{ color: "success.main" }} />
                    ) : (
                      <HighlightOffIcon sx={{ color: "error.main" }} />
                    )}
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
