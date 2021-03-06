import React from "react";
import { useContextConsumer } from "../../AppContext";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchBar({
  setHeaderList,
  initialHeaderList,
  searchText,
  setSearchText,
  isMyTimeEntriesSelected,
}) {
  const { isManager } = useContextConsumer();

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
    setHeaderList(
      initialHeaderList?.filter((d) =>
        d.employeeName.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  if (isManager && !isMyTimeEntriesSelected) {
    return (
      <div className="flex items-center border border-blue-200 h-10 px-4 rounded-sm w-72 md:-mt-4 mb-4">
        <IoSearchOutline size={20} />
        <input
          className="w-full h-full focus:outline-none pl-2"
          placeholder="Search Employee"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
    );
  }

  return null;
}
