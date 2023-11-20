const FundraiserFactoryContract = artifacts.require('FundraiserFactory');
const CampaignManagementContract = artifacts.require('CampaignManagement');


module.exports = function (deployer) {
  deployer.deploy(FundraiserFactoryContract);
  deployer.deploy(CampaignManagementContract,"0xb299A292Ae3156e39E1459D548bef75025C68EAf");
};
