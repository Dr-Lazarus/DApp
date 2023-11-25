
// YourPage.js
import React from 'react';
import RequestTable from 'views/RequestTable'
import { useTheme } from '@mui/material/styles';


const ViewRequests = () => {
    const theme = useTheme();

    // Sample data, replace it with your actual data
    const exampleData = [
        {
          projectName: 'Project A',
          requestedAmount: 1000.0,
          availableAmount: 750.0,
          beneficiaryHash: '0x123456789abcdef',
        },
        {
          projectName: 'Project B',
          requestedAmount: 2000.0,
          availableAmount: 1500.0,
          beneficiaryHash: '0x987654321abcdef',
        },
        {
            projectName: 'Project A',
            requestedAmount: 500.0,
            availableAmount: 750.0,
            beneficiaryHash: '0x123456789abcdef',
          },

        // Add more entries as needed
      ];
            

    return (
        <div>
            {/* <h1>Your Page</h1> */}
            <RequestTable data={exampleData} theme={theme} />
        </div>
    );
};

export default ViewRequests;