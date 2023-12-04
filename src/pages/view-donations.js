
// YourPage.js
import React, { useState, useLayoutEffect } from "react";
import DataTable from 'views/DataTable'
import { useTheme } from '@mui/material/styles';
import FundraiserFactory from "contracts/FundraiserFactory.json";
import FundraiserContract from "contracts/Fundraiser.json";
import Web3 from "web3";
const cc = require("cryptocompare");
import detectEthereumProvider from "@metamask/detect-provider";



const ViewDonations = () => {
    const theme = useTheme();
    const [funds, setFunds] = useState([]);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  let requestData = [];

  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/vfU1nY87ym-xqIkiT9wHvu6BNiYyyMcQ"
    )
  );
  const convertWeiToUsd = async (weiAmount) => {
    const ethAmount = web3.utils.fromWei(weiAmount, "ether"); // Convert Wei to ETH
    try {
      const prices = await cc.price("ETH", ["USD"]);
      const exchangeRate = prices.USD; // Get the ETH to USD exchange rate
      const usdAmount = ethAmount * exchangeRate; // Convert ETH to USD
      return parseFloat(usdAmount.toFixed(2));
      //return weiAmount;
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      return 0; // Return 0 or handle the error as needed
    }
  };

  useLayoutEffect(() => {
    init();
  }, [isDataLoaded]);


//   useLayoutEffect(() => {
//     init();
//   }, []);
  const init = async () => {
    try {
    const networkId = await web3.eth.net.getId();
      const deployedNetwork = FundraiserFactory.networks[networkId];
      const accounts = await web3.eth.getAccounts();
      const fundsinstance = new web3.eth.Contract(
        FundraiserFactory.abi,
        deployedNetwork && deployedNetwork.address
      );

    //   setContract(instance);
      setAccounts(accounts);

      const funds = await fundsinstance.methods.fundraisers(1000, 0).call();
      setFunds(funds);

      console.log(funds,'fundsss')

      let requestData = [];

      for (const fundAddress of funds) {
        console.log(fundAddress,'address')
        const fundContract = new web3.eth.Contract(
          FundraiserContract.abi,
          fundAddress
        );

        // const fund = fundraiser;
      const provider = await detectEthereumProvider();
      web3 = new Web3(provider)
      const instance = new web3.eth.Contract(FundraiserContract.abi, fundContract);
      instance.options.address = fundAddress
    //   setWeb3(web3);
      setContract(instance);


      let num = 0;


      // {info or to do} why use instance inste bm    ad of contract
      // getting properties of the project
      
      checkEmittedEvents(instance, num, requestData, convertWeiToUsd, setData, data, setIsDataLoaded);
      checkApprovedEmittedEvents(instance, num, requestData, convertWeiToUsd, setData, data, setIsDataLoaded);

        
      
      
    //   const web3 = new Web3(provider);
    //   const account = await web3.eth.getAccounts();
      // setuserAccount(account[0]);
      // if (userAccount !== null) {
      //   console.log("accounts---", userAccount);
      //   setAccountsLoaded(true);
      // } else {
      //   // Trigger alert or dialog box if account is not available
      // }

    //   const number = await web3.eth.getBlockNumber();
    }
      
    }catch (error) {
        console.error(error);
      }
    };

    // useLayoutEffect(() => {
    //     checkEmittedEvents(instance, num, requestData, convertWeiToUsd, setData, data, setIsDataLoaded);
    //   }, [data]);

    // Sample data, replace it with your actual data
    const edata = [
        { projectName: 'Project A', ngoName: 'NGO 1', amountType: 'Received', amount: '$1000', address: '0x123456' },
        { projectName: 'Project B', ngoName: 'NGO 2', amountType: 'Spent', amount: '$500', address: '0x789012' },
        // Add more data as needed
    ];

    return (
        <div>
            {isDataLoaded ? (
            <DataTable data={data} theme={theme}
            />
            ):(
            <div>Loading...</div>
            )}
        </div>
    );
};

export default ViewDonations;

function checkEmittedEvents(instance, num, requestData, convertWeiToUsd, setData, data, setIsDataLoaded) {
    instance.events
        .DonationReceived({
            fromBlock: 0,
        })
        .on("data", async (event) => {
            console.log("Approve Received:", event.returnValues);
            console.log('COUNTTTFF', num);
            num += 1;
            console.log('my size', event.length, event.returnValues.length, 'thtta sll');
            console.log('sssup');
            // console.log(event)
            requestData.push({
                projectName: event.returnValues.fundName,
                ngoName: event.returnValues.ngoAddress,
                sendOrRecAddr: event.returnValues.donor,
                amount: await convertWeiToUsd(event.returnValues.value),
                type: 'Donation'
                //   requestID: requests.requestID[i],
                //   requestedAmount: requests.amounts[i],
                //   requestedAmountUSD: await convertWeiToUsd(requests.amounts[i]),
                //   availableAmount: totalDonation,
                //   availableAmountUSD: await convertWeiToUsd(totalDonation),
                //   beneficiaryHash: requests.beneficiaries[i],
                //   status: requests.statuses[i],
                //   fundInstance: fundContract,
            });
            setData(requestData);
            console.log('request issss t his after', data);

            // You can perform additional actions here if needed
        })
        .on("error", console.error);
    setIsDataLoaded(true);

    console.log('request issss this', data);
    return num;
}


function checkApprovedEmittedEvents(instance, num, requestData, convertWeiToUsd, setData, data, setIsDataLoaded) {
    instance.events
        .RequestApproved({
            fromBlock: 0,
        })
        .on("data", async (event) => {
            console.log("Approve Received:", event.returnValues);
            console.log('COUNTTTFF', num);
            num += 1;
            console.log('my size', event.length, event.returnValues.length, 'thtta sll');
            console.log('sssup');
        //     address indexed beneficiary,
        // uint256 value,
        // address indexed ngoAddress,
        // string fundName,
        // uint256 indexed date
            console.log(event)
            requestData.push({
                projectName: event.returnValues.fundName,
                ngoName: event.returnValues.ngoAddress,
                sendOrRecAddr: event.returnValues.beneficiary,
                amount: await convertWeiToUsd(event.returnValues.value),
                type: 'Beneficary Support'
                //   requestID: requests.requestID[i],
                //   requestedAmount: requests.amounts[i],
                //   requestedAmountUSD: await convertWeiToUsd(requests.amounts[i]),
                //   availableAmount: totalDonation,
                //   availableAmountUSD: await convertWeiToUsd(totalDonation),
                //   beneficiaryHash: requests.beneficiaries[i],
                //   status: requests.statuses[i],
                //   fundInstance: fundContract,
            });
            setData(requestData);
            console.log('request issss t his after', data);

            // You can perform additional actions here if needed
        })
        .on("error", console.error);
    setIsDataLoaded(true);

    console.log('request issss this', data);
    return num;
}
