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
import Pagination from "../../components/Table/Pagination";

const isBetween = (startDate, endDate) => {
  return (
    moment().isSameOrAfter(moment(startDate, "YYYY-MM-DD"), "day") &&
    moment().isSameOrBefore(moment(endDate, "YYYY-MM-DD"), "day")
  );
};

const NUMBER_OF_ITEMS_PER_PAGE = 10;

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("All Entries");
  const [selectedPayPeriod, setSelectedPayPeriod] = useState({});
  const [initialHeaderList, setInitialHeaderList] = useState([]);
  const [headerList, setHeaderList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { isManager, userCode, setIsAppLoading, isMyTimeEntriesSelected } =
    useContextConsumer();

  const { data: payPeriodsData } = usePayPeriods();

  // const { data: headersData, isSuccess } = useHeaders(
  //   `?$filter=${
  //     isManager ? "managerCode" : "employeeCode"
  //   } eq '${userCode}' and startDate ge ${
  //     selectedPayPeriod.startDate
  //   } and endDate le ${selectedPayPeriod.endDate}`,
  //   {
  //     enabled: !!Object.keys(selectedPayPeriod).length,
  //   }
  // );

  const { data: employeeHeadersData, isSuccess: isSuccessEmployeeHeaders } =
    useHeaders(
      `?$filter=employeeCode eq '${userCode}' and startDate ge ${selectedPayPeriod.startDate} and startDate le ${selectedPayPeriod.endDate}`,
      {
        enabled: !!Object.keys(selectedPayPeriod).length,
      }
    );

  const { data: managerHeadersData, isSuccess: isSuccessManagerHeaders } =
    useHeaders(
      `?$filter=managerCode eq '${userCode}' and startDate ge ${selectedPayPeriod.startDate} and startDate le ${selectedPayPeriod.endDate}`,
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
    if (isManager && managerHeadersData && !isMyTimeEntriesSelected) {
      if (selectedTab === "Pending") {
        setData(
          managerHeadersData.filter((d) => d.status === "Pending Approval")
        );
      } else if (selectedTab === "Approved") {
        setData(managerHeadersData.filter((d) => d.status === "Released"));
      } else if (selectedTab === "Rejected") {
        setData(managerHeadersData.filter((d) => d.remarks));
      } else {
        setData(
          managerHeadersData.filter((d) => {
            if (d.status === "Open" && !d.remarks) {
              return false;
            }
            return true;
          })
        );
      }
    }
  }, [
    isManager,
    isMyTimeEntriesSelected,
    managerHeadersData,
    selectedTab,
    setData,
  ]);

  useEffect(() => {
    if (isMyTimeEntriesSelected && employeeHeadersData) {
      setData(employeeHeadersData);
    }
  }, [employeeHeadersData, isMyTimeEntriesSelected, setData]);

  useEffect(() => {
    if (!isManager && employeeHeadersData) {
      setData(employeeHeadersData);
    }
  }, [employeeHeadersData, isManager, setData]);

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
          {isManager && !isMyTimeEntriesSelected ? (
            <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          ) : (
            <div />
          )}
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            initialHeaderList={initialHeaderList}
            setHeaderList={setHeaderList}
            isMyTimeEntriesSelected={isMyTimeEntriesSelected}
          />
        </div>
      </div>
      <HeadersTable
        data={headerList}
        isSuccess={isSuccessManagerHeaders && isSuccessEmployeeHeaders}
      />
      {isManager &&
        initialHeaderList.length > NUMBER_OF_ITEMS_PER_PAGE &&
        !searchText && (
          <Pagination
            initialHeaderList={initialHeaderList}
            setHeaderList={setHeaderList}
            numberOfItemsPerPage={NUMBER_OF_ITEMS_PER_PAGE}
          />
        )}
    </div>
  );
}
