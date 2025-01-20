import React, { useState, useEffect, createContext } from "react";
import HeaderTabs from "../components/HeaderTabs";
import CustomerTables from "../components/CustomerTables";
import rewardCalcualtor from "../utilities/rewardCalculator";
import { monthlyCalculator, totalRewardCal } from "../utilities/sumCalculator";
import Loader from "../common/Loader";
import { fetchCustomerData } from "../services/customerApi";

export const customerContext = createContext();

const LandingPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [activeTab, setActiveTab] = useState("cust_trn");

  useEffect(() => {
    if (activeTab === "monthly_rew" && monthlyData.length === 0)
      setMonthlyData(monthlyCalculator(data));
    if (activeTab === "total_rew" && totalData.length === 0)
      setTotalData(totalRewardCal(data));
  }, [activeTab]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchCustomerData();
        setData(rewardCalcualtor(res));
      } catch (err) {
        setError(
          "Please contact support, API call is failng to fetch the data"
        );
      }
    };
    getData();
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
        {activeTab === "total_rew" && (
          <p
            style={{ margin: "auto", width: "fit-content", paddingTop: "10px" }}
          >
            <b>Info</b>: We are accumulating only last three months data from current date
          </p>
        )}
        {error ? (
          <div className="errorMsg">{error}</div>
        ) : data.length > 0 ? (
          <CustomerTables />
        ) : (
          <Loader />
        )}
      </customerContext.Provider>
    </>
  );
};
export default LandingPage;
