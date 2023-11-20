// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

// import "./AccountRegistration.sol";
import "./Fundraiser.sol";
import "./CampaignManagement.sol";



contract Allocation is Ownable {
    
    
    string public name;
    string public image;
    string public description;
    address payable public NGO;  
    address payable public beneficiary;
    uint256 public goalAmount;
    uint256 public totalDonations;
    uint256 public donationsCount;

   Fundraiser private project;
    using SafeMath for uint256;

     struct Request {
        uint256 projectId;
        address beneficiary;
        uint256 amountRequested;
        bool isApproved;
    }

    Request[] public requests;

    // constructor(address _accountRegistry, address _projectManagement) {
    //     // accountRegistry = AccountRegistration(_accountRegistry);
    //     project = Fundraiser
    // }



    
}