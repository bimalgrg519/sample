import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import { useContextConsumer } from "../../AppContext";
import useHeaders from "../../hooks/useHeaders";
import { Loader, HeadersTable } from "../../components";
import { useEffect } from "react/cjs/react.development";

const entriesType = ["OT Entries", "My Time Entries"];

export default function Dashboard() {
  const [selectedEntriesType, setSelectedEntriesType] = useState(
    entriesType[0]
  );
  const [selectedTab, setSelectedTab] = useState("All Entries");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [headerList, setHeaderList] = useState([]);

  const { isManager, userCode } = useContextConsumer();
  const history = useHistory();

  const { isLoading: isLoadingHeaders, data: headersData } = useHeaders(
    `?$filter=${isManager ? "managerCode" : "employeeCode"} eq '${userCode}'`
  );

  useEffect(() => {
    if (headersData) {
      if (isManager) {
        if (selectedTab === "Pending") {
          setHeaderList(
            headersData.filter((d) => d.status === "Pending Approval")
          );
        } else if (selectedTab === "Approved") {
          setHeaderList(headersData.filter((d) => d.status === "Released"));
        } else if (selectedTab === "All Entries") {
          setHeaderList(headersData);
        } else {
          setHeaderList([]);
        }
      } else {
        setHeaderList(headersData);
      }
    }
  }, [headersData, isManager, selectedTab]);

  if (isLoadingHeaders) {
    return <Loader />;
  }

  return (
    <div>
      {isManager ? (
        <div className="flex justify-start relative">
          <div
            className="flex items-center text-primaryBlue cursor-pointer"
            onMouseEnter={() => setIsDropdownVisible(true)}
            onMouseLeave={() => setIsDropdownVisible(false)}
          >
            <span className="text-3xl font-bold mr-2">
              {selectedEntriesType}
            </span>
            <AiFillCaretDown size={22} />
          </div>
          {isDropdownVisible && (
            <div
              className="absolute -bottom-24 bg-white shadow w-60 text-primaryBlue font-medium"
              onMouseEnter={() => setIsDropdownVisible(true)}
              onMouseLeave={() => setIsDropdownVisible(false)}
            >
              {entriesType.map((type) => (
                <div
                  className={`px-2 py-3 cursor-pointer ${
                    selectedEntriesType === type && "bg-blue-50"
                  } border-b border-primaryBlue`}
                  onClick={() => {
                    setSelectedEntriesType(type);
                    setIsDropdownVisible(false);
                  }}
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-primaryBlue">
            My Time Entries
          </span>
          {/* <button
          className="btn btn-primary"
          onClick={() => history.push("newEntry")}
        >
          Add Entry
        </button> */}
        </div>
      )}
      <div className="mt-10">
        <div className="flex justify-between">
          {isManager && selectedEntriesType !== entriesType[1] ? (
            <div className="flex">
              {[
                {
                  title: "All Entries",
                },
                {
                  title: "Pending",
                },
                {
                  title: "Approved",
                },
                {
                  title: "Rejected",
                },
              ].map(({ title }) => (
                <div
                  key={title}
                  onClick={() => setSelectedTab(title)}
                  className={`mr-4 pb-3 cursor-pointer uppercase text-primaryBlue ${
                    selectedTab === title &&
                    "border-b-2 border-primaryBlue font-bold"
                  }`}
                >
                  {title}
                </div>
              ))}
            </div>
          ) : (
            <div />
          )}
          <div className="flex items-center border border-blue-200 h-10 px-4 rounded-sm w-96">
            <IoSearchOutline size={20} />
            <input
              className="w-full h-full focus:outline-none pl-2"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <HeadersTable data={headerList} />
    </div>
  );
}