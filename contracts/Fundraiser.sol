// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Fundraiser is Ownable {
    using SafeMath for uint256;

    struct Donation {
        uint256 value;
        uint256 date;
        address donor;
        string fundName;
    }

    struct FundsRequest {
        uint256 amount;
        address payable beneficiary;
        address NGO;
        RequestStatus status;
    }

    enum RequestStatus {
        Pending,
        Approved,
        Rejected
    }

    mapping(address => Donation[]) public _donations;
    FundsRequest[] public _requests;

    event DonationReceived(address indexed donor, uint256 value);
    event RequestCreated(
        uint256 indexed requestId,
        address indexed beneficiary
    );
    event RequestApproved(
        uint256 indexed requestId,
        address indexed beneficiary
    );
    event RequestRejected(
        uint256 indexed requestId,
        address indexed beneficiary
    );

    string public fundName;
    string public image; // This is the fundname
    string public description;
    uint256 public goalAmount;
    uint256 public totalDonations;
    address public NGOAddress;
    uint256 public donationsCount;
    uint256 public constant REQUEST_AMOUNT = 1 ether; // Hardcoded request amount

    constructor(
        string memory _name,
        string memory _image,
        string memory _description,
        uint256 _goalAmount,
        address _custodian // This is the address of the owner/custodian
    ) public {
        fundName = _name;
        image = _image;
        description = _description;
        NGOAddress = _custodian;
        goalAmount = _goalAmount;
        _transferOwnership(_custodian); // This is the address of the
    }

    function myDonationsCount() public view returns (uint256) {
        return _donations[msg.sender].length;
    }

    function donate() public payable {
        Donation memory donation = Donation({
            value: msg.value,
            date: block.timestamp,
            donor: msg.sender,
            fundName: fundName
        });
        _donations[msg.sender].push(donation);
        totalDonations = totalDonations.add(msg.value);
        donationsCount++;
        emit DonationReceived(msg.sender, msg.value);
    }

    function myDonations()
        public
        view
        returns (
            uint256[] memory values,
            uint256[] memory dates,
            string[] memory fundNames
        )
    {
        uint256 count = myDonationsCount();
        values = new uint256[](count);
        dates = new uint256[](count);
        fundNames = new string[](count);

        for (uint256 i = 0; i < count; i++) {
            Donation storage donation = _donations[msg.sender][i];
            values[i] = donation.value;
            dates[i] = donation.date;
            fundNames[i] = donation.fundName;
        }
    }

    function createRequest(
        address payable _beneficiary,
        uint256 _requestAmount
    ) public {
        require(
            totalDonations >= _requestAmount,
            "Insufficient funds for request"
        );

        _requests.push(
            FundsRequest({
                amount: _requestAmount,
                beneficiary: _beneficiary,
                NGO: NGOAddress, // Storing the NGO's address
                status: RequestStatus.Pending
            })
        );

        emit RequestCreated(_requests.length - 1, _beneficiary);
    }

    function approveRequest(uint256 requestId) public onlyOwner {
        require(requestId < _requests.length, "Invalid request ID");
        FundsRequest storage request = _requests[requestId];
        require(
            request.status == RequestStatus.Pending,
            "Request is not pending"
        );
        require(
            address(this).balance >= REQUEST_AMOUNT,
            "Insufficient contract balance"
        );

        request.beneficiary.transfer(REQUEST_AMOUNT);
        request.status = RequestStatus.Approved;
        totalDonations = totalDonations.sub(REQUEST_AMOUNT);

        emit RequestApproved(requestId, request.beneficiary);
    }

    function rejectRequest(uint256 requestId) public onlyOwner {
        require(requestId < _requests.length, "Invalid request ID");
        FundsRequest storage request = _requests[requestId];
        require(
            request.status == RequestStatus.Pending,
            "Request is not pending"
        );

        request.status = RequestStatus.Rejected;

        emit RequestRejected(requestId, request.beneficiary);
    }
}
