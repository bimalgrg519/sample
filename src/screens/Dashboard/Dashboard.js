import React, { useState, useEffect } from "react";
import { useContextConsumer } from "../../AppContext";
import useHeaders from "../../hooks/useHeaders";
import { Loader, HeadersTable } from "../../components";
import Title from "./Title";
import Tabs from "./Tabs";
import SearchBar from "./SearchBar";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("All Entries");
  const [initialHeaderList, setInitialHeaderList] = useState([]);
  const [headerList, setHeaderList] = useState([]);

  const { isManager, userCode } = useContextConsumer();

  const { isLoading: isLoadingHeaders, data: headersData } = useHeaders(
    `?$filter=${isManager ? "managerCode" : "employeeCode"} eq '${userCode}'`
  );

  useEffect(() => {
    if (headersData) {
      if (isManager) {
        if (selectedTab === "Pending") {
          setData(headersData.filter((d) => d.status === "Pending Approval"));
        } else if (selectedTab === "Approved") {
          setData(headersData.filter((d) => d.status === "Released"));
        } else if (selectedTab === "Rejected") {
          setData(headersData.filter((d) => d.remarks));
        } else {
          setData(headersData);
        }
      } else {
        setData(headersData);
      }
    }
  }, [headersData, isManager, selectedTab]);

  const setData = (data) => {
    setHeaderList(data);
    setInitialHeaderList(data);
  };

  if (isLoadingHeaders) {
    return <Loader />;
  }

  return (
    <div>
      <Title />
      <div className="mt-10">
        <div className="flex justify-between">
          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <SearchBar
            initialHeaderList={initialHeaderList}
            setHeaderList={setHeaderList}
          />
        </div>
      </div>
      <HeadersTable data={headerList} />
    </div>
  );
}
