// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserAccessControl {
    enum UserRole { Donor, Beneficiary, NGO }

    struct User {
        UserRole role;
        bool isRegistered;
    }

    mapping(address => User) public users;
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    function registerUser(address user, UserRole role) public onlyAdmin {
        require(!users[user].isRegistered, "User already registered");
        users[user] = User(role, true);
    }

    function setUser(address user, UserRole role) public {
        require(!users[user].isRegistered, "User already registered");
        users[user] = User(role, true);
    }


    function getUserRole(address user) public view returns (UserRole) {
        require(users[user].isRegistered, "User not registered");
        return users[user].role;


    }

    function register(address user, UserRole role) public {
        // 确保用户尚未注册
        require(!users[user].isRegistered, "User already registered.");

        // 注册用户
        users[user] = User(role, true);

        // 触发注册事件
        emit UserRegistered(user, role);
    }
}