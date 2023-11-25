console.log("hwljdsfj")

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Main from 'layouts/Main';
import Container from 'components/Container';
import Hero from 'components/Hero';
import Contact from 'components/Newsletter';
import FundraiserCard from 'blocks/FundraiserCard';
import FundraiserFactory from 'contracts/FundraiserFactory.json';
import Web3 from 'web3';

export default function mydonations (){
  const theme = useTheme();
  const [funds, setFunds] = useState([]);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com'),
  );

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FundraiserFactory.networks[networkId];
      const accounts = await web3.eth.getAccounts();
      const instance = new web3.eth.Contract(
        FundraiserFactory.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setContract(instance);
      setAccounts(accounts);

      const funds = await instance.methods.fundraisers(1000, 0).call();

      setFunds(funds);
      console.log('------', funds);
      setFunds(funds);
    } catch (error) {
      console.error(error);
    }
  };

  const displayFundraisers = () => {
    return funds.map((fundraiser) => {
      return <FundraiserCard fundraiser={fundraiser} key={fundraiser} />;
    });
  };

  return (
    <Main>
      <Container>
        <Hero
          image={
            'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          }
          title={'Fund a project!'}
          heading={'Grow with projects you support'}
          subtitle={'Provide support to ongoing projects by donating ether.'}
        />
      </Container>

    </Main>
  );
}
