const FundraiserFactoryContract = artifacts.require('FundraiserFactory');
const FundraiserContract = artifacts.require('Fundraiser');

contract('FundraiserFactory: deployment', (accounts) => {
  
  before(async () => {
    // Deploy a new instance of FundraiserFactoryContract
    const fundraiserFactoryDeployed = await FundraiserFactoryContract.new();
    fundraiserFactory = await FundraiserFactoryContract.at(fundraiserFactoryDeployed.address)
    // Log the deployed address
    console.log("Deployed address is", fundraiserFactory.address);
    const name = 'Beach cleaning';
  const image =
    'https://images.unsplash.com/photo-1554265352-d7fd5129be15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';
  const description =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eleifend id enim convallis tempus.';
  const beneficiary = accounts[1];
  const goalAmount = '10';

  it('increments the fundraisersCount', async () => {
    // fundraiserFactory = await FundraiserFactoryContract.deployed();
    const currentFundraisersCount = await fundraiserFactory.fundraisersCount();
    const newFundraiser = await fundraiserFactory.createFundraiser(
      name,
      image,
      description,
      goalAmount,
      beneficiary,
    );
   
    const txReceipt = await web3.eth.getTransactionReceipt(newFundraiser.tx);
    // Log the gas used
    console.log(`Gas used in createFundraiser: ${txReceipt.gasUsed}`);
    const newFundraisersCount = await fundraiserFactory.fundraisersCount();

    assert.equal(
      newFundraisersCount - currentFundraisersCount,
      1,
      'should increment by 1',
    );
  });

  it('emits the FundraiserCreated event', async () => {
    fundraiserFactory = await FundraiserFactoryContract.deployed();
    const tx = await fundraiserFactory.createFundraiser(
      name,
      image,
      description,
      goalAmount,
      beneficiary,
     
    );
    const expectedEvent = 'FundraiserCreated';
    const actualEvent = tx.logs[0].event;

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
  




contract('FundraiserFactory: fundraisers', (accounts) => {
  async function createFundraiserFactory(fundraiserCount, accounts) {
    const factory = await FundraiserFactoryContract.new();
    await addFundraisers(factory, fundraiserCount, accounts);
    // console.log("haha",haha)
    return factory;
  }

  async function addFundraisers(factory, count, accounts) {
    const name = 'Beneficiary';
    const lowerCaseName = name.toLowerCase();
    const beneficiary = accounts[1];

    for (let i = 0; i < count; i++) {
      await factory.createFundraiser(
        `${name} ${i}`,
        `${lowerCaseName}${i}.com`,
        `${lowerCaseName}${i}.png`,
        `Description for ${name} ${i}`,
        beneficiary,
      );
    }
  }

  describe('when fundraisers collection is empty', () => {
    it('returns an empty collection', async () => {

      const factory = await createFundraiserFactory(0, accounts);
      // console.log("factory is",factory)
      const fundraisers = await factory.fundraisers(10, 0);
      assert.equal(fundraisers.length, 0, 'collection should be empty');
    });
  });
});
});
