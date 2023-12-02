// YourPage.js
import React from "react";
import { useState, useEffect } from "react";
import RequestTable from "views/RequestTable";
import { useTheme } from "@mui/material/styles";

// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import { useTheme } from '@mui/material/styles';
// import Main from 'layouts/Main';
// import Container from 'components/Container';
// import Hero from 'components/Hero';
// // import Contact from 'components/Newsletter';
import FundraiserCard from "blocks/FundraiserCard";
import FundraiserFactory from "contracts/FundraiserFactory.json";
import FundraiserContract from "contracts/Fundraiser.json";
import Web3 from "web3";

const ViewRequests = () => {
  const theme = useTheme();
  const [funds, setFunds] = useState([null]);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/vfU1nY87ym-xqIkiT9wHvu6BNiYyyMcQ"
    )
  );

  useEffect(() => {
    init();
    getRequestsCreated();
  }, []);

  const init = async () => {
    try {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FundraiserFactory.networks[networkId];
      const accounts = await web3.eth.getAccounts();
      const instance = new web3.eth.Contract(
        FundraiserFactory.abi,
        deployedNetwork && deployedNetwork.address
      );
      setContract(instance);
      setAccounts(accounts);

      const funds = await instance.methods.fundraisers(1000, 0).call();

      setFunds(funds);
      console.log("--------", funds);
      setFunds(funds);
    } catch (error) {
      console.error(error);
    }
  };
  const getRequestsCreated = async () => {
    try {
      const currentBlock = await web3.eth.getBlockNumber();
      const fromBlock = Math.max(currentBlock - 1000, 0); // Ensure fromBlock is not negative
      for (const fundAddress of funds) {
        const fundContract = new web3.eth.Contract(
          FundraiserContract.abi,
          fundAddress
        );
        const events = await fundContract.getPastEvents("RequestCreated", {
          fromBlock: 0,
          toBlock: "latest",
        });
        //console.log("EVENTS", events);

        // Log each event for this fund
        events.forEach((event) => console.log("EVENT #", event.returnValues));
      }
    } catch (error) {
      console.error("Error fetching RequestCreated events:", error);
    }
  };

  return (
    <div>
      {/* <h1>Your Page</h1> */}
      {/* <RequestTable data={exampleData} theme={theme} /> */}
    </div>
  );
};

export default ViewRequests;
