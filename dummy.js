const CampaignManagement = artifacts.require("./CampaignManagement.sol");


const campaignManagement = CampaignManagement.new("0xb299A292Ae3156e39E1459D548bef75025C68EAf");

campaignManagement.createCampaign(
    'Beach cleaning', 
    'https://images.unsplash.com/photo-1554265352-d7fd5129be15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', 
    'ipsum dolor sit amet, consectetur', 
    '10', 
    '0xE56d66CED3805ae91641DC7670783aD677b4827b',
    { from: '0xf96D1EA0A7c051c714e49799a27053f45587d5ea' }
);