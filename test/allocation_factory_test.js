const { expect } = require("chai");

const Allocation = artifacts.require("Allocation");
const AllocationFactory = artifacts.require("AllocationFactory");

contract("AllocationFactory Tests", (accounts) => {
    let allocationFactory;
    let allocation;

    before(async () => {
        // Mumbai
        // const factoryAddress = '0xa0624c35724eb364389b0f580804d39b520514d2';
        // local
        const factoryAddress = '0x4912ABCEF7E912637a63571F6f218a760A9F516C';   
        allocationFactory = await AllocationFactory.at(factoryAddress);// Use the deployed instance
        console.log("depployed address is",allocationFactory.address)
        // expect(allocationFactory.address).to.equal('0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0')
    });

    it("should successfully create an Allocation contract", async () => {
        const projectName = "New Hahahah";
        const projectHashId = "0x83ba4d0008811b34fe0094b3ccc9e905e381a09f7c2fd157bbc8f50cc41c98f1"; // actual transaciton hash from fundraiser
        console.log("accounts below")
        const beneficiary = "0xE56d66CED3805ae91641DC7670783aD677b4827b";
        const NGO = "0xf96D1EA0A7c051c714e49799a27053f45587d5ea";
        const amountNeeded = "10"
        const explanation = "Project explanation";
        console.log("the accounts",accounts[0],accounts[1,accounts[2]])
        const result = await allocationFactory.createAllocation(
          projectName,
          projectHashId,
          beneficiary,
          NGO,
          amountNeeded,
          explanation,
          { from: accounts[0] }
        );
      
        // Check if event is emitted
        expect(result.logs[0].event).to.equal("AllocationCreated");
      
        // Verify Allocation contract is created
        const allocationAddress = result.logs[0].args.newAllocationContract;

        const allocation = await Allocation.at(allocationAddress);
      
        // Verify details of the created Allocation contract
        // Add checks based on Allocation contract's public methods
      });
      
      it("should revert on invalid parameters", async () => {
        const projectName = "Invalid Project Test";
        const projectHashId = "0x83ba4d0008811b34fe0094b3ccc9e905e381a09f7c2fd157bbc8f50cc41c98f1"; // Replace with actual hash ID
        const beneficiary = "0x0000000000000000000000000000000000000000"; // Valid format, but logically invalid (zero address)
        const NGO = "0xf96D1EA0A7c051c714e49799a27053f45587d5ea";
        const amountNeeded = "10";
        const explanation = "Invalid project explanation";
      
        try {
          await allocationFactory.createAllocation(
            projectName,
            projectHashId,
            beneficiary,
            NGO,
            amountNeeded,
            explanation,
            { from: accounts[0] }
          );
        } catch (err) {
          assert.include(err.message, "revert", "The error message should contain 'revert'");
        }
      });
  
    // ... test cases will be here ...
  });
