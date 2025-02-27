import React, { useEffect, useState, memo } from "react";
import "../styles/table.css";
import Loader from "./Loader";

const Table = (props) => {
  const { tabData, columns } = props;
  const [currPage, setCurrPage] = useState(1);
  const recordsPerPage = 10;
  const totalPage = Math.ceil(tabData.length / recordsPerPage);
  const start = (currPage - 1) * recordsPerPage;
  const end = recordsPerPage + start;
  const currentData = tabData.slice(start, end);

  const handlePagination = (pageNumber) => {
    setCurrPage(pageNumber);
  };

  useEffect(() => {
    setCurrPage(1);
  }, [columns.length]);

  const renderPagination = () => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <button
          className="pagBtn"
          key={i}
          onClick={() => handlePagination(i)}
          disabled={currPage === i}
          style={{ margin: "5px 5px" }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <>
      {columns.length > 0 ? (
        <>
          <table className="cust_table">
            <thead>
              <tr>
                {columns.map((col, i) => (
                  <th key={i} id={col}>
                    {col === "price"
                      ? "Price (in Dollars)"
                      : col
                          .split("_")
                          .map((a) => a.charAt(0).toUpperCase() + a.slice(1))
                          .join(" ")}
                  </th>
                ))}
              </tr>
            </thead>
            {currentData.length > 0 && (
              <tbody>
                {currentData.map((item, i) => (
                  <tr key={i}>
                    {columns.map((col) => (
                      <td
                        key={col + i}
                        style={{
                          textAlign: isNaN(item[col]) ? "center" : "right",
                        }}
                      >
                        {item[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {currentData.length === 0 && (
            <p style={{ position: "fixed", marginLeft: "40%" }}>
              No records to Display
            </p>
          )}
          <div className="pagination">{renderPagination()}</div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default memo(Table);
