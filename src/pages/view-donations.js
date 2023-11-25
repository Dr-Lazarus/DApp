
// YourPage.js
import React from 'react';
import DataTable from 'views/DataTable'
import { useTheme } from '@mui/material/styles';


const ViewDonations = () => {
    const theme = useTheme();

    // Sample data, replace it with your actual data
    const data = [
        { projectName: 'Project A', ngoName: 'NGO 1', amountType: 'Received', amount: '$1000', address: '0x123456' },
        { projectName: 'Project B', ngoName: 'NGO 2', amountType: 'Spent', amount: '$500', address: '0x789012' },
        // Add more data as needed
    ];

    return (
        <div>
            {/* <h1>Your Page</h1> */}
            <DataTable data={data} theme={theme} />
        </div>
    );
};

export default ViewDonations;