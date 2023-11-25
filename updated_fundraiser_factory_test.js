const FundraiserFactoryContract = artifacts.require('FundraiserFactory');
const FundraiserContract = artifacts.require('Fundraiser');

contract('FundraiserFactory: deployment', (accounts) => {
  let fundraiserFactory
  const name = 'Beach cleaning';
  const image = 'https://images.unsplash.com/photo-1554265352-d7fd5129be15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';
  const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eleifend id enim convallis tempus.';
  const beneficiary = accounts[1];
  const goalAmount = '10';

  before(async () => {
   
    const fundraiserFactoryDeployed = await FundraiserFactoryContract.new();
    fundraiserFactory = await FundraiserFactoryContract.at(fundraiserFactoryDeployed.address);
    
    // erick local uploaded
  
    fundraiserFactory = await FundraiserFactoryContract.at("0x7EF3C6Ee75EfA01b5d22238425Da67b6af03d39C");
    
    console.log("Deployed address is", fundraiserFactory.address);
  });

  it('increments the fundraisersCount', async () => {
    const currentFundraisersCount = await fundraiserFactory.fundraisersCount();
    const newFundraiser = await fundraiserFactory.createFundraiser(
      name, image, description, goalAmount, beneficiary
    );

    const newFundraiserReceipt = await web3.eth.getTransactionReceipt(newFundraiser.tx);
    console.log(`Gas used in createFundraiser: ${newFundraiserReceipt.gasUsed}`);
    const newFundraisersCount = await fundraiserFactory.fundraisersCount();

    assert.equal(
      newFundraisersCount - currentFundraisersCount,
      1,
      'should increment by 1'
    );
  });

  it('emits the FundraiserCreated event', async () => {
    const tx = await fundraiserFactory.createFundraiser(
      name, image, description, goalAmount, beneficiary
    );

    const expectedEvent = 'FundraiserCreated';
    const actualEvent = tx.logs[0].event;
    console.log("expected event run")
    assert.equal(actualEvent, expectedEvent, 'events should match');
  });

  


});
  // UNCOMMENT ONLY IF YOU WANT TO TEST UR PREVIOUSLY DEPLOYED CONTRACT AND PASS THE ADDRESS
//   before(async () => {
//     // Mumbai
//     // const factoryAddress = '0x7cf4D91aF99e38e4fD69c5365b92E63985a5e8be';
//     // local
//     const factoryAddress = '0x43EC3c629019b9C70Da9D83b01Eeb12c86ff5900';   
//     fundraiserFactory = await FundraiserFactoryContract.at(factoryAddress);// Use the deployed instance
//     console.log("depployed address is",fundraiserFactory.address)
//     // expect(allocationFactory.address).to.equal('0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0')
// });
  



  // Test Retrieving Fundraisers
  it('should correctly retrieve a fundraiser', async () => {
    await fundraiserFactory.createFundraiser(name, image, description, goalAmount, beneficiary);
    const fundraiser = await fundraiserFactory._fundraisers(0);
    // Add assertions to check if the fundraiser's properties match what was set
  });

  // Test Fundraisers Limit
  it('should not allow creating more than the set limit of fundraisers', async () => {
    // You need to add the logic to create fundraisers up to the limit
    // Then attempt to create one more and expect it to fail or handle it as per contract logic
  });

  // Test for Correct Initialization of a Fundraiser
  it('should correctly initialize a fundraiser', async () => {
    const newFundraiser = await fundraiserFactory.createFundraiser(name, image, description, goalAmount, beneficiary);
    // Retrieve the fundraiser and assert its properties are set correctly
  });

  // Negative Test Cases
  it('should fail to create a fundraiser with invalid data', async () => {
    // Attempt to create a fundraiser with invalid data and expect it to fail
  });
