import { useCallback, useEffect, useReducer, useState, useLayoutEffect } from 'react';
import { IconButton, Dialog, DialogActions, Button, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Account from './components/Account';
import { ellipseAddress, getChainData } from './lib/utilities';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers } from 'ethers';
const ethers = require('ethers')
import React from "react"

import Web3Modal from 'web3modal';
const contractAddress = "0xc6E661773fae058F55c354001e25a8E842f511Bc"
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "enum UserAccessControl.UserRole",
        "name": "role",
        "type": "uint8"
      }
    ],
    "name": "UserRegistered",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "users",
    "outputs": [
      {
        "internalType": "enum UserAccessControl.UserRole",
        "name": "role",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isRegistered",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "enum UserAccessControl.UserRole",
        "name": "role",
        "type": "uint8"
      }
    ],
    "name": "registerUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "enum UserAccessControl.UserRole",
        "name": "role",
        "type": "uint8"
      }
    ],
    "name": "setUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "enum UserAccessControl.UserRole",
        "name": "role",
        "type": "uint8"
      }
    ],
    "name": "register",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getUserRole",
    "outputs": [
      {
        "internalType": "enum UserAccessControl.UserRole",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]


async function storeUserAddress(walletAddress, role, provider) {
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  if (role == "Beneficiary") {
    role = 1
  }
  if (role = "Donor") {
    role = 0
  }
  if (role = "NGO") {
    role = 2
  }

  try {
    console.log("asdasdas")
    // const result = await contract.getUserRole(walletAddress)
    // console.log("the result is ", result)

    try {
      const transaction = await contract.setUser(walletAddress, role);
    } catch (error) {
      alert("User Already Registered");
    }
    await transaction.wait();

    console.log(`User address stored: ${walletAddress}`, `User Role stored: ${role}`);
    useLayoutEffect(() => {
      sessionStorage.setItem('userAddress', walletAddress)
      sessionStorage.setItem('role', role)
    }, [])
    console.log("retrieve")
    useLayoutEffect(() => {
      console.log(sessionStorage.getItem('userAddress'))
    }, [])
    console.log("done retrieve")
  } catch (error) {
    console.error('Error storing user address:', error);
  }
}
export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.INFURA_API_KEY, // required
    },
  },
};
let web3Modal;
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mumbai', // optional
    cacheProvider: true,
    providerOptions, // required
  });


}


const initialState = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_WEB3_PROVIDER':
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      };
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.address,
      };
    case 'SET_CHAIN_ID':
      return {
        ...state,
        chainId: action.chainId,
      };
    case 'RESET_WEB3_PROVIDER':
      return initialState;
    default:
      throw new Error();
  }
}

export const Login = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { provider, web3Provider, address, chainId } = state;
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [role, setRole] = useState('');
  // const [nric, setNric] = useState('');

  const connect = useCallback(async function () {
    try{ 
      const provider = await web3Modal.connect();
      const web3Provider = new providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      const network = await web3Provider.getNetwork();
  
  
      console.log(role)
      console.log(role, address)
      console.log("SSSSS")
      await storeUserAddress(address, role, web3Provider);
      console.log('post store')
      
      dispatch({
        type: 'SET_WEB3_PROVIDER',
        provider,
        web3Provider,
        address,
        chainId: network.chainId,
      });
    }
    catch (error){
      alert(error.message);
    }
   
  }, []);

  const RoleDialog = React.memo(() => {
    const handleSubmit = async () => {
      // connect to the wallet
      await connect();
      // save the address and role
      // await storeUserAddressAndRole(address, role, nric, web3Provider);
      setShowRoleDialog(false);
    };

    return (
      <Dialog open={showRoleDialog} onClose={() => setShowRoleDialog(false)}
        style={{ width: '80%', height: '70%', margin: 'auto' }}>
        <DialogTitle>Registration</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Select Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
          >
            {['Donor', 'Beneficiary', 'NGO'].map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRoleDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit and Connect</Button>
        </DialogActions>
      </Dialog>
    );
  });

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect();
      }
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      });
      setAnchorEl(null);
      useLayoutEffect(() => {
        sessionStorage.setItem('userAddress', null)
        sessionStorage.setItem('role', null)
      }, [])
    },
    [provider],
  );

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        // eslint-disable-next-line no-console
        console.log('accountsChanged', accounts);
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        });
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId) => {
        window.location.reload();
      };

      const handleDisconnect = (error) => {
        // eslint-disable-next-line no-console
        console.log('disconnect', error);
        disconnect();
      };

      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      provider.on('disconnect', handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged);
          provider.removeListener('chainChanged', handleChainChanged);
          provider.removeListener('disconnect', handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  const chainData = getChainData(chainId);
  const handleOpenRoleDialog = () => {
    setShowRoleDialog(true);
  };

  return (
    <div className="container">
      {web3Provider ? (
        <Account
          icon="https://firebasestorage.googleapis.com/v0/b/virtualground-meta.appspot.com/o/nft%2Ficon.png?alt=media&token=51904b60-2b20-47aa-9502-67f4aabc8061"
          address={ellipseAddress(address)}
          handleLogout={disconnect}
        />
      ) : (
        <IconButton color="primary" onClick={handleOpenRoleDialog} size="medium">
          <AccountBalanceWalletIcon fontSize="large" />
        </IconButton>
      )}
      <RoleDialog />
    </div>
  );
};

export default Login;