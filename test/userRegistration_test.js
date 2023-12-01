const UserAccessControl = artifacts.require("UserAccessControl");

contract("UserAccessControl", accounts => {
  const [admin, user1, user2] = accounts;
  let userAccessControl;
  console.log("admin user1 user2",admin, user1, user2)

  beforeEach(async () => {
    userAccessControl = await UserAccessControl.new();
  });

  it("should allow the admin to register a new user", async () => {
    const txResponse = await userAccessControl.register(user1, 0, { from: admin }); // 0 is UserRole.Donor
    // const gasUsed = userAccessControl.receipt.gasUsed;
    // console.log(`Gas used in calling register function: ${gasUsed}`);
    // Get the transaction receipt
    const txReceipt = await web3.eth.getTransactionReceipt(txResponse.tx);
  
    // Log the gas used
    console.log(`Gas used for registering a user with register function: ${txReceipt.gasUsed}`);
    
    
    const user = await userAccessControl.users(user1);
    assert.equal(user.isRegistered, true, "User should be registered");
    assert.equal(user.role, 0, "User role should be Donor");
  });

  it("should not allow a non-admin to register a new user", async () => {
    try {
      await userAccessControl.register(user2, 1, { from: user1 }); // 1 is UserRole.Beneficiary
      assert.fail("Non-admin should not be able to register a new user");
    } catch (error) {
      assert(error, "Expected an error but did not get one");
    }
  });
  it('should measure gas for registering a user', async () => {
    // Call the function
    const txResponse = await userAccessControl.registerUser(user1, 0, { from: admin });
    // Get the transaction receipt
    const txReceipt = await web3.eth.getTransactionReceipt(txResponse.tx);
  
    // Log the gas used
    console.log(`Gas used for registering a user: ${txReceipt.gasUsed}`);
  });
  

});