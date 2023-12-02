// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistration {
    enum UserRole {
        Admin,
        User,
        Guest
    }

    struct User {
        UserRole role;
        bool isRegistered;
    }

    // 将用户地址映射到用户数据
    mapping(address => User) public users;

    // 事件，用于在用户注册时发出
    event UserRegistered(address user, UserRole role);

    // 注册用户函数
}
