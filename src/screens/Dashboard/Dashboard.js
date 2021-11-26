import React, { useState, useEffect } from "react";
import { useContextConsumer } from "../../AppContext";
import useHeaders from "../../hooks/useHeaders";
import { HeadersTable } from "../../components";
import Title from "./Title";
import Tabs from "./Tabs";
import SearchBar from "./SearchBar";
import usePayPeriods from "../../hooks/usePayPeriods";
import PayPeriodsDropdownList from "./PayPeriodsDropdownList";
import moment from "moment";

const isBetween = (startDate, endDate) => {
  return (
    moment().isSameOrAfter(moment(startDate, "YYYY-MM-DD"), "day") &&
    moment().isSameOrBefore(moment(endDate, "YYYY-MM-DD"), "day")
  );
};

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("All Entries");
  const [selectedPayPeriod, setSelectedPayPeriod] = useState({});
  const [initialHeaderList, setInitialHeaderList] = useState(null);
  const [headerList, setHeaderList] = useState([]);

  const { isManager, userCode, setIsAppLoading } = useContextConsumer();

  const { data: payPeriodsData } = usePayPeriods();

  const { data: headersData, isSuccess } = useHeaders(
    `?$filter=${
      isManager ? "managerCode" : "employeeCode"
    } eq '${userCode}' and startDate ge ${
      selectedPayPeriod.startDate
    } and endDate le ${selectedPayPeriod.endDate}`,
    {
      enabled: !!Object.keys(selectedPayPeriod).length,
    }
  );

  const setData = React.useCallback(
    (data) => {
      setHeaderList(data);
      setInitialHeaderList(data);
      setIsAppLoading(false);
    },
    [setIsAppLoading]
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
  }, [headersData, isManager, selectedTab, setData]);

  useEffect(() => {
    if (payPeriodsData) {
      setSelectedPayPeriod(
        payPeriodsData.find(({ startDate, endDate }) =>
          isBetween(startDate, endDate)
        )
      );
    }
  }, [payPeriodsData]);

  return (
    <div>
      <Title />
      <div className="mt-6 px-1">
        <PayPeriodsDropdownList
          data={payPeriodsData}
          selectedPayPeriod={selectedPayPeriod}
          setSelectedPayPeriod={setSelectedPayPeriod}
        />
        <div className="flex flex-col-reverse md:flex-row justify-between">
          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <SearchBar
            initialHeaderList={initialHeaderList}
            setHeaderList={setHeaderList}
          />
        </div>
      </div>
      <HeadersTable data={headerList} isSuccess={isSuccess} />
    </div>
  );
}
