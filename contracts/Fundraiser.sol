// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Fundraiser is Ownable {
    using SafeMath for uint256;

    struct Donation {
        uint256 value;
        uint256 date;
    }

    struct FundsRequest {
        uint256 amount;
        address payable beneficiary;
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

    string public name;
    string public image;
    string public description;
    uint256 public goalAmount;
    uint256 public totalDonations;
    uint256 public donationsCount;
    uint256 public constant REQUEST_AMOUNT = 1 ether; // Hardcoded request amount

    constructor(
        string memory _name,
        string memory _image,
        string memory _description,
        uint256 _goalAmount,
        address _custodian
    ) public {
        name = _name;
        image = _image;
        description = _description;
        goalAmount = _goalAmount;
        _transferOwnership(_custodian);
    }

    function myDonationsCount() public view returns (uint256) {
        return _donations[msg.sender].length;
    }

    function donate() public payable {
        Donation memory donation = Donation({
            value: msg.value,
            date: block.timestamp
        });
        _donations[msg.sender].push(donation);
        totalDonations = totalDonations.add(msg.value);
        donationsCount++;

        emit DonationReceived(msg.sender, msg.value);
    }

    function myDonations()
        public
        view
        returns (uint256[] memory values, uint256[] memory dates)
    {
        uint256 count = myDonationsCount();
        values = new uint256[](count);
        dates = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            Donation storage donation = _donations[msg.sender][i];
            values[i] = donation.value;
            dates[i] = donation.date;
        }
    }

    function createRequest(address payable _beneficiary) public {
        require(
            totalDonations >= REQUEST_AMOUNT,
            "Insufficient funds for request"
        );

        _requests.push(
            FundsRequest({
                amount: REQUEST_AMOUNT,
                beneficiary: _beneficiary,
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
