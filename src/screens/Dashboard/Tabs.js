import React from "react";

export default function Tabs({ selectedTab, setSelectedTab }) {
  return (
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
          className={`mr-4 sm:pt-2 cursor-pointer uppercase text-primaryBlue text-sm sm:text-base ${
            selectedTab === title && "border-b-2 border-primaryBlue font-bold"
          }`}
        >
          {title}
        </div>
      ))}
    </div>
  );
}
