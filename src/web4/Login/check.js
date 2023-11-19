// const ethers = require('ethers');

// require('dotenv').config(); // Ensure that your environment variables are loaded

// async function checkUserRole(contractAddress, userAddress) {
//     const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`);

//     // Update this ABI to match your UserAccessControl contract's ABI
//     const contractABI = [/* ... Your Contract ABI ... */];

//     const contract = new ethers.Contract(contractAddress, contractABI, provider);

//     try {
//         // Call the getUserRole function
//         const role = await contract.getUserRole(userAddress);
//         console.log(`User role is: ${role}`);
//         return role;
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// // Replace with your actual contract address and the user address you want to check
// checkUserRole("your_contract_address", "user_address_to_check");
