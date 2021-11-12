import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import useUserProfile from "../../hooks/useUserProfile";

const entriesType = ["OT Entries", "My Time Entries"];

export default function Dashboard() {
  const [selectedEntriesType, setSelectedEntriesType] = useState(
    entriesType[0]
  );
  const [selectedTab, setSelectedTab] = useState("All Entries");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const history = useHistory();

  const { employeeNo } = useUserProfile();

  return (
    <div>
      <div className="flex justify-start relative">
        <div
          className="flex items-center text-primaryBlue cursor-pointer"
          onMouseEnter={() => setIsDropdownVisible(true)}
          onMouseLeave={() => setIsDropdownVisible(false)}
        >
          <span className="text-3xl font-bold mr-2">{selectedEntriesType}</span>
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
      <div className="mt-10">
        <div className="flex justify-between">
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
          <div className="flex items-center border border-blue-200 h-10 px-4 rounded-sm w-96 -mt-3">
            <IoSearchOutline size={20} />
            <input
              className="w-full h-full focus:outline-none pl-2"
              placeholder="Search"
            />
          </div>
        </div>
        <table className="w-full table-fixed shadow">
          <thead>
            <tr className="text-left bg-primaryDarkBlue text-white uppercase">
              <th className="py-3 pl-10">Submission Date</th>
              <th className="py-3">No. Of Hours Worked</th>
              <th className="py-3">Manager</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array(12)
              .fill("")
              .map((d) => (
                <tr
                  className="even:bg-lightGreen font-helvetica cursor-pointer"
                  onClick={() => history.push("employeeTimeEntry")}
                >
                  <td className="py-3 pl-10">18-05-2021</td>
                  <td className="py-3">30 Hrs</td>
                  <td className="py-3">Foo Bar</td>
                  <td className="py-3">Approval waiting</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
