const FundraiserContract = artifacts.require('Fundraiser');

contract('Fundraiser', (accounts) => {
  let fundraiser;
  const name = 'Beach cleaning';
  const image =
    'https://images.unsplash.com/photo-1554265352-d7fd5129be15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';
  const description =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eleifend id enim convallis tempus.';
  const beneficiary = accounts[1];

  console.log("beneficiary is",beneficiary)
  const goalAmount = '10';
  const owner = accounts[0];

  beforeEach(async () => {
    fundraiser = await FundraiserContract.new(
      name,
      image,
      description,
      goalAmount,
      // beneficiary,
      owner,
    );
  });

  describe('initialization', () => {
    it('gets the beneficiary name', async () => {
      const actual = await fundraiser.name();

      // const gasUsed = actual.receipt.gasUsed;
      // console.log(`Gas used in calling fundraiser name: ${gasUsed}`);  
      assert.equal(actual, name, 'names should match');
    });

    it('gets the beneficiary image', async () => {
      const actual = await fundraiser.image();
      // const gasUsed = actual.receipt.gasUsed;
      // console.log(`Gas used in calling fundraiser image: ${gasUsed}`);  
      assert.equal(actual, image, 'image should match');
    });

    it('gets the beneficiary description', async () => {
      const actual = await fundraiser.description();
      // const gasUsed = actual.receipt.gasUsed;
      // console.log(`Gas used in calling fundraiser description: ${gasUsed}`);  
      assert.equal(actual, description, 'description should match');
    });


    it('gets the goalAmount', async () => {
      const actual = await fundraiser.goalAmount();
      // const gasUsed = actual.receipt.gasUsed;
      // console.log(`Gas used in calling fundraiser goalAmount: ${gasUsed}`);  
      assert.equal(actual, goalAmount, 'goalAmount should match');
    });

    it('gets the owner', async () => {
      const actual = await fundraiser.owner();
      // const gasUsed = actual.receipt.gasUsed;
      // console.log(`Gas used in calling fundraiser owner: ${gasUsed}`);  
      assert.equal(actual, owner, 'bios should match');
    });
  });


  describe('making donations', () => {
    const value = web3.utils.toWei('1.5');
    // const value = web3.utils.toWei('0.0289');
    const donor = accounts[2];

    it('increases myDonationsCount', async () => {
      const currentDonationsCount = await fundraiser.myDonationsCount({
        from: donor,
      });

      // const gasUsed = currentDonationsCount.receipt.gasUsed;
      // console.log(`Gas used in calling myDonationsCount Function: ${gasUsed}`);  
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

    it('includes donation in myDonations', async () => {

      await fundraiser.donate({ from: donor, value });
      const { values, dates } = await fundraiser.myDonations({ from: donor });

      assert.equal(value, values[0], 'values should match');
      assert(dates[0], 'date should be present');
    });

    it('increases the totalDonations amount', async () => {
      console.log("cur total donan")
      const currentTotalDonations = await fundraiser.totalDonations();

      // const gasUsed = currentTotalDonations.receipt.gasUsed;
      // console.log(`Gas used in calling totalDonationsFunction: ${gasUsed}`);  

      
      console.log("cur total donation",currentTotalDonations)

      await fundraiser.donate({ from: donor, value });
      const newTotalDonations = await fundraiser.totalDonations();
      console.log("new total donation",currentTotalDonations)

      
      const diff = newTotalDonations - currentTotalDonations;
      console.log("diff donation count",diff)
      console.log("value donation count",value)
      
      assert.equal(diff.toString(), value.toString(), 'difference should match the donation value');
    });

    it('increases donationsCount', async () => {
      const currentDonationsCount = await fundraiser.donationsCount();
      await fundraiser.donate({ from: donor, value });
      const newDonationsCount = await fundraiser.donationsCount();

      // const gasUsed = newDonationsCount.receipt.gasUsed;
      // console.log(`Gas used in calling donationsCount Function: ${gasUsed}`);  

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
      const donor = accounts[0];
      await fundraiser.donate({ from: donor, value });
      const beneficiary = accounts[2]; // Choose an account as the beneficiary

      // console.log("this owner beneficiary")
      // console.log(owner)
      console.log(beneficiary)
      const totalDonations = await fundraiser.totalDonations();
      // const totalFunds = await fundraiser.getTotalDonations();
      console.log(`Total funds in the contract: ${totalDonations.toString()}`);
  
      const txResponse = await fundraiser.createRequest(beneficiary, { from: owner });

    
      // Get the transaction receipt to find the gas used
      const txReceipt = await web3.eth.getTransactionReceipt(txResponse.tx);
      console.log(`Gas used for createRequest function: ${txReceipt.gasUsed}`);

      const expectedEvent = 'RequestCreated';
      const actualEvent = txResponse.logs[0].event;

      assert.equal(actualEvent, expectedEvent, 'events should match');
      const requestId = 0; // Assuming there's at least one request
      const approveReqResponse = await fundraiser.approveRequest(0, { from: owner });
      const approveReqResponseReceipt = await web3.eth.getTransactionReceipt(approveReqResponse .tx);
      console.log(`Gas used for approveRequest function: ${approveReqResponseReceipt.gasUsed}`);
    
    
    //   // Get the transaction receipt to find the gas used
    //   const txReceipt = await web3.eth.getTransactionReceipt(txResponse.tx);
    //   console.log(`Gas used for approveRequest function: ${txReceipt.gasUsed}`);
    
      // Perform your assertions here, for example, check if the request was created
      // You can retrieve the last request and compare its details
    });
    // describe('making donations', () => {
    //   const value = web3.utils.toWei('1.5');
    //   const donor = accounts[0];
    //   const beneficiary = accounts[2]; 
    
    //   beforeEach(async () => {
    //     await fundraiser.donate({ from: donor, value });
    //   });
    
    
    //   const totalDonations = await fundraiser.totalDonations();
    //   // const totalFunds = await fundraiser.getTotalDonations();
    //   console.log(`Total funds in the contract: ${totalDonations.toString()}`);
  
    //   const txResponse = await fundraiser.createRequest(beneficiary, { from: owner });
    //   // Get the transaction receipt to find the gas used
    //   const txReceipt = await web3.eth.getTransactionReceipt(txResponse.tx);
    //   console.log(`Gas used for createRequest function: ${txReceipt.gasUsed}`);

    //   const rejectReqResponse = await fundraiser.rejectRequest(0, { from: owner });
    //   const rejectReqResponseReceipt = await web3.eth.getTransactionReceipt(rejectReqResponse .tx);
    //   console.log(`Gas used for rejectRequest function: ${rejectReqResponseReceipt.gasUsed}`);
      
     
    // });
    
  
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
    
        const txResponse = await fundraiser.createRequest(beneficiary, { from: owner });
        // Get the transaction receipt to find the gas used
        const txReceipt = await web3.eth.getTransactionReceipt(txResponse.tx);
        console.log(`Gas used for createRequest function: ${txReceipt.gasUsed}`);
  
        const rejectReqResponse = await fundraiser.rejectRequest(0, { from: owner });
        const rejectReqResponseReceipt = await web3.eth.getTransactionReceipt(rejectReqResponse .tx);
        console.log(`Gas used for rejectRequest function: ${rejectReqResponseReceipt.gasUsed}`);



      })
    
    
      
     
    });

  

  describe('fallback function', () => {
    const donor = accounts[2];
    const value = web3.utils.toWei('0.0289');

    console.log("value is ",value)

  //   it('increases the totalDonations amount', async () => {
  //     const currentTotalDonations = await fundraiser.totalDonations();
  //     console.log("Current total donations:", currentTotalDonations.toString());
    
  //     await fundraiser.donate({ from: donor, value });
  //     const newTotalDonations = await fundraiser.totalDonations();
  //     console.log("New total donations:", newTotalDonations.toString());
    
  //     const diff = newTotalDonations.sub(currentTotalDonations); // Using BigNumber subtraction
  //     console.log("Difference in donations:", diff.toString());
  //     console.log("Expected donation value:", value);
    
  //     assert.equal(diff.toString(), value, 'difference should match the donation value');
  //   });

  //   it('increases donationsCount', async () => {
  //     const currentDonationsCount = await fundraiser.donationsCount();
  //     await web3.eth.sendTransaction({
  //       to: fundraiser.address,
  //       from: accounts[9],
  //       value,
  //     });
  //     const newDonationsCount = await fundraiser.donationsCount();



  //     assert.equal(
  //       1,
  //       newDonationsCount - currentDonationsCount,
  //       'donationsCount should increment by 1',
  //     );
  //   });
  });
});
