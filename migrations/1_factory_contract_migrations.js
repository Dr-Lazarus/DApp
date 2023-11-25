const FundraiserFactoryContract = artifacts.require('FundraiserFactory');
const CampaignManagementContract = artifacts.require('CampaignManagement');
const AllocationContract = artifacts.require('AllocationFactory');

module.exports = function (deployer) {
  // deployer.deploy(AllocationContract);
  deployer.deploy(FundraiserFactoryContract);
  
};
