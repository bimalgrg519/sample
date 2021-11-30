import React from "react";
import { useContextConsumer } from "../../AppContext";

export default function Title({
  isMyTimeEntriesSelected,
  setIsMyTimeEntriesSelected,
}) {
  const { isManager } = useContextConsumer();

  return (
    <div className="flex">
      {isManager ? (
        <div className="flex bg-gray-200 rounded p-1 cursor-pointer text-xl">
          <div
            className={`px-4 py-1 rounded ${
              !isMyTimeEntriesSelected
                ? "bg-primaryBlue text-white font-bold"
                : "hover:bg-gray-300"
            }`}
            onClick={() => setIsMyTimeEntriesSelected(!isMyTimeEntriesSelected)}
          >
            OT Entries
          </div>
          <div
            className={`px-4 py-1 rounded ${
              isMyTimeEntriesSelected
                ? "bg-primaryBlue text-white font-bold"
                : "hover:bg-gray-300"
            }`}
            onClick={() => setIsMyTimeEntriesSelected(!isMyTimeEntriesSelected)}
          >
            My Time Entries
          </div>
        </div>
      ) : (
        <div className="text-2xl font-bold text-primaryBlue">
          My Time Entries
        </div>
      )}
    </div>
  );
}
