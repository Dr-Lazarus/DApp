const FundraiserContract = artifacts.require('Fundraiser');

contract('Fundraiser', (accounts) => {
  let fundraiser;
  const name = 'Beach cleaning';
  const image =
    'https://images.unsplash.com/photo-1554265352-d7fd5129be15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';
  const description =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eleifend id enim convallis tempus.';
  const goalAmount = '10';
  const custodian = accounts[0];

  beforeEach(async () => {
    fundraiser = await FundraiserContract.new(
      name,
      image,
      description,
      goalAmount,
      custodian,
    );
  });

  describe('Create Fundraiser and get the parameters Test', () => {
    it('Get Created fundraiser fundName', async () => {
      const actual = await fundraiser.fundName(); 
      assert.equal(actual, name, 'names should match');
    });

    it('Get Created Fundraiser Image', async () => {
      const actual = await fundraiser.image();
      assert.equal(actual, image, 'image should match');
    });

    it('Get created fundraiser fundName description', async () => {
      const actual = await fundraiser.description();
      assert.equal(actual, description, 'description should match');
    });


    it('gets the goalAmount', async () => {
      const actual = await fundraiser.goalAmount();
      assert.equal(actual, goalAmount, 'goalAmount should match');
    });

    it('gets the owner/custodian', async () => {

      const actual = await fundraiser.owner();
      console.log('actual not actual',actual,custodian)
    
      assert.equal(actual, custodian, 'custodian should match');
    });
  });


  describe('Create Donation Test', () => {
    const value = web3.utils.toWei('1.5');
    const donor = accounts[2];

    it('increases myDonationsCount Test', async () => {
      const currentDonationsCount = await fundraiser.myDonationsCount({
        from: donor,
      });

      await fundraiser.donate({ from: donor, value });
      const newDonationsCount = await fundraiser.myDonationsCount({
        from: donor,
      });

      assert.equal(
        1,
        newDonationsCount - currentDonationsCount,
        'myDonationsCount should increment by 1',
      );
     
    });

    it('includes the submitted donation in myDonations', async () => {
      await fundraiser.donate({ from: donor, value });
      const { values, dates } = await fundraiser.myDonations({ from: donor });
      assert.equal(value, values[0], 'values should match');
      assert(dates[0], 'date should be present');
    });

    it('increases the totalDonations amount', async () => {
      console.log("cur total donan")
      const currentTotalDonations = await fundraiser.totalDonations();
      await fundraiser.donate({ from: donor, value });
      const newTotalDonations = await fundraiser.totalDonations();
      const diff = newTotalDonations - currentTotalDonations;
      assert.equal(diff.toString(), value.toString(), 'difference should match the donation value');
    });

    it('increases donationsCount', async () => {
      const currentDonationsCount = await fundraiser.donationsCount();
      await fundraiser.donate({ from: donor, value });
      const newDonationsCount = await fundraiser.donationsCount();

      assert.equal(
        1,
        newDonationsCount - currentDonationsCount,
        'donationsCount should increment by 1',
      );
    });

    it('emits the DonationReceived event', async () => {
      const tx = await fundraiser.donate({ from: donor, value });
      const gasUsed = tx.receipt.gasUsed;
      console.log(`Gas used in donate function: ${gasUsed}`);  
      const expectedEvent = 'DonationReceived';
      const actualEvent = tx.logs[0].event;

      assert.equal(actualEvent, expectedEvent, 'events should match');
    });
    it('should create a fund request and log the gas used', async () => {
      // Set up: Ensure there are sufficient total donations to meet the requirement
      // You might need to simulate some donations here if your contract requires it
    
      const value = web3.utils.toWei('1.5');
      // const value = web3.utils.toWei('0.0289');
      const donor = accounts[2];
     
      await fundraiser.donate({ from: donor,value });
      const beneficiary = accounts[1]; // Choose an account as the beneficiary

      // console.log("this custodian beneficiary")
      // console.log(custodian)
      console.log(beneficiary)
      const totalDonations = await fundraiser.totalDonations();
      // const totalFunds = await fundraiser.getTotalDonations();
      console.log(`Total funds in the contract: ${totalDonations.toString()}`);
      const reqAmount = web3.utils.toWei('1.5');
      const txResponse = await fundraiser.createRequest(beneficiary,reqAmount);

    
      // Get the transaction receipt to find the gas used
      const txReceipt = await web3.eth.getTransactionReceipt(txResponse.tx);
      console.log(`Gas used for createRequest function: ${txReceipt.gasUsed}`);

      const expectedEvent = 'RequestCreated';
      const actualEvent = txResponse.logs[0].event;

      assert.equal(actualEvent, expectedEvent, 'events should match');
      const requestId = 0; // Assuming there's at least one request
      const approveReqResponse = await fundraiser.approveRequest(requestId, { from: custodian });
      const approveReqResponseReceipt = await web3.eth.getTransactionReceipt(approveReqResponse .tx);
      console.log(`Gas used for approveRequest function: ${approveReqResponseReceipt.gasUsed}`);
    
  
    });    
  
  });
  describe('reject donations', () => {
      const value = web3.utils.toWei('1.5');
      const donor = accounts[0];
      const beneficiary = accounts[2]; 
    
      beforeEach(async () => {
        await fundraiser.donate({ from: donor, value });
      });
    
      it('should create a fund request and log the gas used', async () => {
        const totalDonations = await fundraiser.totalDonations();
        // const totalFunds = await fundraiser.getTotalDonations();
        console.log(`Total funds in the contract: ${totalDonations.toString()}`);
        const reqAmount = web3.utils.toWei('1');
    
        const txResponse = await fundraiser.createRequest(beneficiary, reqAmount);
        // Get the transaction receipt to find the gas used
        const txReceipt = await web3.eth.getTransactionReceipt(txResponse.tx);
        console.log(`Gas used for createRequest function: ${txReceipt.gasUsed}`);
  
        const rejectReqResponse = await fundraiser.rejectRequest(0, { from: custodian });
        const rejectReqResponseReceipt = await web3.eth.getTransactionReceipt(rejectReqResponse .tx);
        console.log(`Gas used for rejectRequest function: ${rejectReqResponseReceipt.gasUsed}`);



      })
    
    
      
     
    });


});
