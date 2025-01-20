import React, { useContext, useEffect, useRef, useState } from "react";
import { customerContext } from "../pages/LandingPage";
import Table from "../common/Table";
import SearchBar from "../common/SearchBar";

const CustomerTables = () => {
  const { activeTab, data, monthlyData, totalData } =
    useContext(customerContext);

  let tableData = [];
  if (activeTab === "cust_trn") tableData = data;
  else if (activeTab === "monthly_rew") tableData = monthlyData;
  else tableData = totalData;

  const [copyData, setCopyData] = useState(structuredClone(tableData));
  const columns = useRef([]);

  useEffect(() => {
    columns.current = [];
  }, [activeTab]);

  useEffect(() => {
    setCopyData(tableData);
    if (tableData.length > 0) columns.current = Object.keys(tableData[0]);
  }, [activeTab, monthlyData, totalData]);

  return (
    <div className="tab-content">
      <SearchBar
        copData={copyData}
        setCopyData={setCopyData}
        orgData={tableData}
        activeTab={activeTab}
      />
      <Table tabData={copyData} columns={columns.current} />
    </div>
  );
};
export default CustomerTables;
