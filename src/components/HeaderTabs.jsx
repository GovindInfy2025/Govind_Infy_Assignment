import React, { useContext } from 'react';
import { customerContext } from './LandingPage';
import '../styles/headerTabs.css';
const HeaderTabs = () => {
  const { activeTab, handleTabChange } = useContext(customerContext);
  const tabs = {
    cust_trn: 'Customers Transactions',
    monthly_rew: 'Monthly Rewards',
    total_rew: 'Total Rewards',
  };
  return (
    <div className="tabs">
      {Object.keys(tabs).map((tab) => (
        <div
          id={tab}
          key={tab}
          className={`tab ${activeTab === tab ? 'active' : ''}`}
          onClick={(e) => handleTabChange(e.target.id)}
        >
          {tabs[tab]}
        </div>
      ))}
    </div>
  );
};
export default HeaderTabs;
