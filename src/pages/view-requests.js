
// YourPage.js
import React from 'react';
import ViewRequestTable from 'views/ViewRequestTable'
import { useTheme } from '@mui/material/styles';


const ViewRequests = () => {
    const theme = useTheme();

    // Sample data, replace it with your actual data
    const data = [
        { ngoName: 'NGO 1', projectName: 'Project A', status: 'Approved', amount: '$1000'},
        { ngoName: 'NGO 2', projectName: 'Project B', status: 'Rejected', amount: '$1000'},
        // Add more data as needed
    ];

    return (
        <div>
            {/* <h1>Your Page</h1> */}
            <ViewRequestTable data={data} theme={theme} />
        </div>
    );
};

export default ViewRequests;