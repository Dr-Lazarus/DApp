// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Allocation.sol";

contract AllocationFactory {
    // Event to log the creation of a new Allocation contract
    event AllocationCreated(address indexed newAllocationContract);

    // Array to keep track of all created Allocation contracts
    Allocation[] public allocations;

    function createAllocation(
        string memory _projectName,
        string memory _projectHashId,
        address payable _beneficiary,
        address payable _NGO,
        uint256 _amountNeeded,
        string memory _explanation
    ) public {
        // Create a new Allocation contract
        Allocation newAllocation = new Allocation(
            _projectName,
            _projectHashId,
            _beneficiary,
            _NGO,
            _amountNeeded,
            _explanation
        );

        // Store the address of the new contract
        allocations.push(newAllocation);

        // Emit an event for the creation of the new Allocation contract
        emit AllocationCreated(address(newAllocation));
    }

    // Function to get the count of Allocation contracts created
    function getAllocationsCount() public view returns (uint256) {
        return allocations.length;
    }
}