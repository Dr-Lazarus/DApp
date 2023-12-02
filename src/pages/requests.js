
import React from "react";
import { useState, useLayoutEffect } from "react";
import RequestTable from "views/RequestTable";
import { useTheme } from "@mui/material/styles";

import FundraiserCard from "blocks/FundraiserCard";
import FundraiserFactory from "contracts/FundraiserFactory.json";
import FundraiserContract from "contracts/Fundraiser.json";
import Web3 from "web3";
import { json } from "react-router-dom";

const ViewRequests = () => {
  const theme = useTheme();
  const [funds, setFunds] = useState([null]);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const amounts = []
  const availableAmounts = []
  const projects = []
  const fund_instances = []
  const beneficiaries = []
  const statuses = []
  const [data, setData] = useState([{null:null}]);

  const exampleData = [
    {
      projectName: 'Project A',
      requestedAmount: 1000.0,
      availableAmount: 750.0,
      beneficiaryHash: '0x123456789abcdef',
    },
    {
      projectName: 'Project B',
      requestedAmount: 2000.0,
      availableAmount: 1500.0,
      beneficiaryHash: '0x987654321abcdef',
    },
    {
        projectName: 'Project A',
        requestedAmount: 500.0,
        availableAmount: 750.0,
        beneficiaryHash: '0x123456789abcdef',
      },

    // Add more entries as needed
  ];
        
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/vfU1nY87ym-xqIkiT9wHvu6BNiYyyMcQ"
    )
  );

  useLayoutEffect(() => {
    init().then(data => setData(data));
    // getRequestsCreated();
  },[]);

  const init = async () => {
    try {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FundraiserFactory.networks[networkId];
      const accounts = await web3.eth.getAccounts();
      const instance = new web3.eth.Contract(
        FundraiserFactory.abi,
        deployedNetwork && deployedNetwork.address
      );
      // await instance.deployed(); // Wait for the contract address to be set
      setContract(instance);
      setAccounts(accounts);

      const funds = await instance.methods.fundraisers(1000, 0).call();

      setFunds(funds);
      console.log("-----------------", funds);
      setFunds(funds);

      try {
        for (const fundAddress of funds) {
          const fundContract = new web3.eth.Contract(
            FundraiserContract.abi,
            fundAddress
          );
  
          if (!fundContract.options.address) {
            console.error('Contract address not set:', fundContract);
            continue;
          }
  
          const fngo = await fundContract.methods.ngoAddress().call();
          const useraddress = '0x6A0560385DeC22E29cB606e2707e1aD13Fdd7333'
          if(fngo!=useraddress){
            console.log('not what i need')
            continue;
          }
          console.log('fund add',fngo)
          const requests = await fundContract.methods.allRequests().call();
          console.log('djg')
          console.log("Requests #", requests);

          console.log("dfdsfdf", requests)

          console.log("dasfjdsd", requests.amounts[1])
  
          amounts += requests.amounts
          beneficiaries += requests.beneficiaries
  
          const proj_name = await fundContract.methods.fundName().call();

          // for(let i=0;i<requests.amounts.length;i++){
          //   projects+=proj_name;
          // }

          projects += Array(requests.amounts.length).fill(proj_name); 
  
          // const proj_addr = await fundContract.methods.address().call()
          fund_instances += Array(requests.amounts.length).fill(fundContract); 
          // proj_addresses += Array(requests.amounts.length).fill(proj_addr);
          const totalDonation =  await fundContract.methods.totalDonations().call()
          availableAmounts += Array(requests.amounts.length).fill(totalDonation); 
  
          statuses+= requests.statuses
  
          console.log('proj name',proj_name)
          console.log('projects',projects)
        //   for(let i = 0; i < projects.length; i++) {
        //      console.log(projects[i]);
        //   console.log('aa',availableAmounts)
        
        //   // console.log(jsonform.)
  
        //   // projects += 
        // }

        // for (let i=0; i< projects.length; i++){

        //   console.log(projects[i]);

        //   data+= {
        //     project: projects[i],
        //     amount: amounts[i],
        //     availableAmount: availableAmounts[i],
        //     beneficiary: beneficiaries[i],
        //     status: statuses[i],
        //     fund_instance: fund_instances[i]
        //   };

          
        // }
        data = [projects, amounts, availableAmounts, beneficiaries, statuses, fund_instances]
          setData[data]
          console.log('befoere sedning',data)
  
          // const jsonform = JSON.stringify(data)
          // console.log('jos for', jsonform)
          return data;
      }
      } catch (error) {
        console.error("Error fetching RequestCreated events:", error);
        
      }
      // getRequestsCreated();
    } catch (error) {
      console.error(error);
    }
  };
  // const getRequestsCreated = async () => {
  //   try {
  //     for (const fundAddress of funds) {
  //       const fundContract = new web3.eth.Contract(
  //         FundraiserContract.abi,
  //         fundAddress
  //       );

  //       if (!fundContract.options.address) {
  //         console.error('Contract address not set:', fundContract);
  //         continue;
  //       }

  //       const fngo = await fundContract.methods.ngoAddress().call();
  //       const useraddress = '0x6A0560385DeC22E29cB606e2707e1aD13Fdd7333'
  //       if(fngo!=useraddress){
  //         console.log('not what i need')
  //         continue;
  //       }
  //       console.log('fund add',fngo)
  //       const requests = await fundContract.methods.allRequests().call();
  //       console.log('djg')
  //       console.log("Requests #", requests);

  //       amounts += requests.amounts
  //       beneficiaries += requests.beneficiaries

  //       const proj_name = await fundContract.methods.fundName().call();
  //       projects += Array(requests.amounts.length).fill(proj_name); 

  //       // const proj_addr = await fundContract.methods.address().call()
  //       fund_instances += Array(requests.amounts.length).fill(fundContract); 
  //       // proj_addresses += Array(requests.amounts.length).fill(proj_addr);
  //       const totalDonation =  await fundContract.methods.totalDonations().call()
  //       availableAmounts += Array(requests.amounts.length).fill(totalDonation); 

  //       statuses+= requests.statuses

  //       console.log('proj name',proj_name)
  //       console.log('projects',projects)
  //       console.log('aa',availableAmounts)

  //       reqdata = [projects, amounts, availableAmounts, beneficiaries, statuses, fund_instances]
  //       setdata[reqdata]
  //       console.log('befoere sedning',reqdata)

  //       const jsonform = JSON.stringify(reqdata)
  //       console.log('jos for', jsonform)
  //       // console.log(jsonform.)

  //       // projects += 
  //     }
  //   } catch (error) {
  //     console.error("Error fetching RequestCreated events:", error);
      
  //   }
  // };

  return (
    <div>
      {/* console.log("im called rist") */}
      {/* <h1>Your Page</h1> */}
      <RequestTable data={data} theme={theme} />
    </div>
  );
};

export default ViewRequests;
