// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
// import './CampaignManager.sol';

contract Allocation is Ownable {
  using SafeMath for uint256;

  struct Request {
        string projectName;
        string projectHashId;
        address payable NGO;
        address payable beneficiary;
        uint256 amountNeeded;
        string explanation;
        bool isApproved;
        bool isTransferred;
    }
  Request[] public _requests;
  

//   event DonationReceived(address indexed donor, uint256 value);
  event RequestInitiated(address beneficiary,address NGO, uint256 value);
  event RequestAllocated(address beneficiary,address NGO, uint256 value);

  string projectName;
  string projectHashId;
  address payable public beneficiary;
  address payable public NGO;
  uint256 public goalAmount;
  uint256 amountNeeded;
  string explanation;
  bool isApproved;
  bool isTransferred;


 constructor(
    string memory _projectName,
    string memory _projectHashId,
    address payable  _beneficiary,
    address payable  _NGO,
    uint256 _amountNeeded,
    string memory _explanation
    // {info} see if i need custodian thing
    // address _custodian
  ) 
  public {
    projectName= _projectName;
    projectHashId= _projectHashId;
    beneficiary=  _beneficiary;
    NGO=  _NGO;
    amountNeeded =  _amountNeeded;
    explanation = _explanation;
    // _transferOwnership(_custodian);
  }

  function setBeneficiary(address payable _beneficiary) public onlyOwner {
    beneficiary = _beneficiary;
  }
   function myRequestsCount() public view returns (uint256) {
    return _requests.length;
  }
  function createRequest(
        string memory _projectName,
        string memory _projectHashId,
        address payable _beneficiary,
        address payable _NGO,
        uint256 _amountNeeded,
        string memory _explanation
    ) public {
        Request memory newRequest = Request({
            projectName: _projectName,
            projectHashId: _projectHashId,
            NGO: _NGO,
            beneficiary: _beneficiary,
            amountNeeded: _amountNeeded,
            explanation: _explanation,
            isApproved: false,  // assuming default is not approved
            isTransferred: false  // assuming default is not transferred
        });

        _requests.push(newRequest);
        // wtf myRequestsCount++;
        emit RequestInitiated(_beneficiary,_NGO, _amountNeeded);
  
    }


function transferAllocation(uint256 requestIndex) public payable {
        // Ensure the request exists and the transfer has not already occurred
        require(requestIndex < _requests.length, "Request does not exist.");
        require(!_requests[requestIndex].isTransferred, "Funds already transferred.");

        // Ensure the caller is the NGO associated with the request
        require(msg.sender == _requests[requestIndex].NGO, "Only the NGO can allocate funds for this request.");

        // Ensure there are enough funds in the contract
        Request storage curRequest = _requests[requestIndex];
        require(address(this).balance >= curRequest.amountNeeded, "Insufficient funds in contract.");

        // Transfer funds to the beneficiary this is their account
        curRequest.beneficiary.transfer(curRequest.amountNeeded);

        // Update the request as transferred
        curRequest.isTransferred = true;
        emit RequestAllocated(curRequest.beneficiary,curRequest.NGO, curRequest.amountNeeded);
  
    }

 function getAllRequests() public view returns (Request[] memory) {
        return _requests;
    }


//   function withdraw() public onlyOwner {
//       uint256 balance = address(this).balance;
//       beneficiary.transfer(balance);
//       emit Withdraw(balance);
//   }

   receive() external payable {}

}