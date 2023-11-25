// // SPDX-License-Identifier: MIT

// pragma solidity ^0.8.0;

// import './Fundraiser.sol';

// contract CampaignManagement {
//   uint256 constant maxLimit = 50;
//   Fundraiser[] public _campaigns;

//   event CampaignCreated(Fundraiser indexed newCampaign, address indexed owner);
  
//   address public contractAddress;

//     constructor(address _contractAddress) {
//         contractAddress = _contractAddress;
//     }

  
//   function createCampaign(
//     string memory name,
//     string memory image,
//     string memory description,
//     uint256 goalAmount,
//     address payable NGO
//   ) public {
    
//     Fundraiser newCampaign = new Fundraiser(
//       name,
//       image,
//       description,
//       goalAmount,
//       NGO,
//     //   beneficiary,
//       msg.sender
//     );
//     _campaigns.push(newCampaign);
    
//     emit CampaignCreated(newCampaign, msg.sender);
//   }

//   function campaignsCount() public view returns (uint256) {
//     return _campaigns.length;
//   }

//   // {info} this should be showing the list of projects
//   function campaigns(uint256 limit, uint256 offset)
//     public
//     view
//     returns (Fundraiser[] memory coll)
//   {
//     require(offset <= campaignsCount(), 'offset out of bounds');

//     uint256 size = campaignsCount() - offset;
//     size = size < limit ? size : limit;
//     size = size < maxLimit ? size : maxLimit;
//     coll = new Fundraiser[](size);

//     for (uint256 i = 0; i < size; i++) {
//       coll[i] = _campaigns[offset + i];
//     }

//     return coll;
//   }
// }
