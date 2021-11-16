import React from "react";
import { useContextConsumer } from "../../AppContext";

export default function Tabs({ selectedTab, setSelectedTab }) {
  const { isManager } = useContextConsumer();

  if (isManager) {
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
            className={`mr-4 pb-3 cursor-pointer uppercase text-primaryBlue ${
              selectedTab === title && "border-b-2 border-primaryBlue font-bold"
            }`}
          >
            {title}
          </div>
        ))}
      </div>
    );
  }

  return <div />;
}
