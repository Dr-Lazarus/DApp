const FundraiserFactoryContract = artifacts.require('FundraiserFactory');
const FundraiserContract = artifacts.require('Fundraiser');

contract('FundraiserFactory: deployment', (accounts) => {
  let fundraiserFactory
  const name = 'Beach cleaning';
  const image = 'https://images.unsplash.com/photo-1554265352-d7fd5129be15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';
  const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eleifend id enim convallis tempus.';
  const goalAmount = '10';

  before(async () => {
   
    const fundraiserFactoryDeployed = await FundraiserFactoryContract.new();
    fundraiserFactory = await FundraiserFactoryContract.at(fundraiserFactoryDeployed.address);
 
    // The receipt should have the decoded logs if using Truffle artifacts
  
    // erick local uploaded
  
    // fundraiserFactory = await FundraiserFactoryContract.at("0x63DDf3A1f4626a3Ce86C5F95BEB62b64E6d2d0e5");
    
    // console.log("Deployed address is", fundraiserFactory.address);
  });

  it('increments the fundraisersCount', async () => {
    const currentFundraisersCount = await fundraiserFactory.fundraisersCount();
    const newFundraiser = await fundraiserFactory.createFundraiser(
      name, image, description, goalAmount
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
      name, image, description, goalAmount
    );

    const gasUsed = tx.receipt.gasUsed;
    console.log(`Gas used: ${gasUsed}`);  

    const expectedEvent = 'FundraiserCreated';
    const actualEvent = tx.logs[0].event;
    console.log("expected event run")
    assert.equal(actualEvent, expectedEvent, 'events should match');


  });
  it('returns an array of fundraisers', async () => {
    // Create some fundraisers for testing
    const project_one = await fundraiserFactory.createFundraiser(
      'Fundraiser 1', 'Image 1', 'Description 1', '100'
    );
    const project_two = await fundraiserFactory.createFundraiser(
      'Fundraiser 2', 'Image 2', 'Description 2', '200'
    );
  
    // Specify the limit and offset for retrieving fundraisers
    const limit = 10;
    const offset = 0;
  
    // Call the fundraisers function to retrieve fundraisers
    const fundraisers = await fundraiserFactory.fundraisers(limit, offset);
  
    console.log("msg sender",accounts[0])
    console.log("funnds", fundraisers)
    console.log("project one",project_one)
    


    // Perform assertions on the retrieved fundraisers
    assert.isArray(fundraisers, 'fundraisers should be an array');
    // assert.lengthOf(fundraisers, 4, 'fundraisers array should have the expected length');
    console.log("fundraisers one list",fundraisers[0])
    // You can add more specific assertions based on your contract logic
    // For example, check if the fundraiser details match what you expect
    // assert.equal(fundraisers[2].name, 'Fundraiser 1', 'Fundraiser 1 name should match');
    // assert.equal(fundraisers[3].name, 'Fundraiser 2', 'Fundraiser 2 name should match');
  });
 


});

  


