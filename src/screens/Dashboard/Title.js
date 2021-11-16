import React from "react";
import { useContextConsumer } from "../../AppContext";

export default function Title() {
  const { isManager } = useContextConsumer();

  return (
    <div className="flex justify-between items-center">
      <span className="text-3xl font-bold text-primaryBlue">
        {isManager ? "OT Entries" : "My Time Entries"}
      </span>
    </div>
  );
}
