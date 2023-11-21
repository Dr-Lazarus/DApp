const Allocation = artifacts.require("Allocation");
const AllocationFactory = artifacts.require("AllocationFactory");

contract("Allocation Tests", accounts => {
    it("should correctly initialize an Allocation contract", async () => {
        // Deploy an Allocation contract and test its properties
        // Example: const allocation = await Allocation.new(/* constructor args */);
        // assert.equal(await allocation.someProperty.call(), expectedValue, "Property should be set correctly");
    });

    // Additional tests for Allocation...
});

contract("AllocationFactory Tests", accounts => {
    it("should correctly create an Allocation contract", async () => {
        // const factory = await AllocationFactory.deployed();
        const factory = await AllocationFactory.new();
        console.log(factory.address)
        // Call createAllocation and test the result
        // Example: await factory.createAllocation(/* args */);
        // Check if the Allocation contract was created and is tracked
    });

    // Additional tests for AllocationFactory...
});