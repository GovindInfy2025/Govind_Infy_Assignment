import React, { useState, useEffect, createContext } from 'react';
import HeaderTabs from './HeaderTabs';
import CustomerTables from './CustomerTables';
import rewardCalcualtor from '../utilities/rewardCalculator';
import { monthlyCalculator, totalRewardCal } from '../utilities/sumCalculator';
import Loader from '../common/Loader';

export const customerContext = createContext();

const LandingPage = () => {
  const [data, setData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [activeTab, setActiveTab] = useState('cust_trn');

  useEffect(() => {
    if (activeTab === 'monthly_rew' && monthlyData.length === 0)
      setMonthlyData(monthlyCalculator(data));
    if (activeTab === 'total_rew' && totalData.length === 0)
      setTotalData(totalRewardCal(data));
  }, [activeTab]);

  useEffect(() => {
    fetch('/data/dummyData.json')
      .then((res) => res.json())
      .then((apiData) => {
        apiData.sort(
          (a, b) => new Date(a.purchase_date) - new Date(b.purchase_date)
        );
        setData(rewardCalcualtor(apiData));
      })
      .catch((err) => console.log('Error fetching data', err));
  }, []);

  const handleTabChange = (id) => {
    setActiveTab(id);
  };

  return (
    <>
      <customerContext.Provider
        value={{ activeTab, handleTabChange, data, monthlyData, totalData }}
      >
        <HeaderTabs />
        {data.length > 0 ? <CustomerTables /> : <Loader />}
      </customerContext.Provider>
    </>
  );
};
export default LandingPage;
