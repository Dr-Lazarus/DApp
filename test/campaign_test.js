const CampaignManagement = artifacts.require("./CampaignManagement.sol");
const chai = require("chai");
const { expect } = chai;

contract("CampaignManagement", (accounts) => {
    let campaignManagement;

    beforeEach(async () => {
        campaignManagement = await CampaignManagement.new("0xb299A292Ae3156e39E1459D548bef75025C68EAf");
    });

    describe("Create Campaign", () => {
        it("should allow creating a new campaign", async () => {
            // Replace these parameters with those required by your contract
            const name = 'Beach cleaning';
            const image =
              'https://images.unsplash.com/photo-1554265352-d7fd5129be15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';
            const description =
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eleifend id enim convallis tempus.';
            const goalAmount = '10';
            
            const NGO ="0xf96D1EA0A7c051c714e49799a27053f45587d5ea";

            const currentCount = await campaignManagement.campaignsCount();
   
            await campaignManagement.createCampaign(  
                name,
                image,
                description,
                goalAmount,
                NGO,
                { from: '0xf96D1EA0A7c051c714e49799a27053f45587d5ea' } 

                );

             const campaignManagementCount = await campaignManagement.campaignsCount();
             assert.equal(
                campaignManagementCount - currentCount,
                1,
                'should increment by 1',
              );
            });

        
        });
    });

 