import React, { useEffect, useState } from "react";

const SearchBar = (props) => {
  const { setCopyData, orgData, activeTab } = props;
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    const debounceTime = setTimeout(() => {
      handleSearch();
    }, [1000]);
    return () => clearInterval(debounceTime);
  }, [searchStr]);

  useEffect(() => {
    setSearchStr("");
  }, [activeTab]);

  const handleSearch = () => {
    if (searchStr === "") {
      setCopyData(orgData);
      return;
    }
    const filtered = orgData.filter((cust) =>
      Object.values(cust).some((val) =>
        val.toString().toLowerCase().includes(searchStr.toLowerCase())
      )
    );
    setCopyData(filtered);
  };

  return (
    <input
      type="search"
      placeholder="Search by Customer's Name, Id or Purshase Date"
      value={searchStr}
      onChange={(e) => setSearchStr(e.target.value)}
    />
  );
};
export default SearchBar;
