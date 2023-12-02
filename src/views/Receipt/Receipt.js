import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Receipt = () => {
  const router = useRouter();
  const [donation, setDonation] = useState(null);
  const [fundName, setFundName] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (router.query) {
      const { donationAmount, date, fund } = router.query;
      // Format date here as needed
      const formattedDate = new Date(parseInt(date) * 1000).toLocaleDateString(
        "en-US"
      );
      setDonation(donationAmount);
      setDate(formattedDate);
      setFundName(fund);
    }
  }, [router.query]);

  return (
    <div className="receipt-container">
      <div className="receipt-header">
        <h3>Thank you for your donation to {fundName}</h3>
      </div>
      <div className="receipt-info">
        <div>Date of Donation: {date}</div>
        <div>Donation Value: ${donation}</div>
      </div>
    </div>
  );
};

export default Receipt;
