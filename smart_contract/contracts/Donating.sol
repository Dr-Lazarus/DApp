// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract Donating {

    struct Donation {
      uint amount; 
      uint date; 
      string message; 
    }
    Donation[] public donations;
    address public owner;

    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    mapping(uint => Task) public tasks;

    function createTask(string memory _content) public {
        require(bytes(_content).length > 0, "Content must not be empty"); // Check that content is not empty
        taskCount++;

        // Create a new task
        tasks[taskCount] = Task({
            id: taskCount,
            content: _content,
            completed: false
        });
    }

    }