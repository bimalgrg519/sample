import React, { useState } from "react";
import { useContextConsumer } from "../../AppContext";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchBar({ setHeaderList, initialHeaderList }) {
  const { isManager } = useContextConsumer();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
    setHeaderList(
      initialHeaderList.filter((d) =>
        d.employeeName.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  if (isManager) {
    return (
      <div className="flex items-center border border-blue-200 h-10 px-4 rounded-sm w-96">
        <IoSearchOutline size={20} />
        <input
          className="w-full h-full focus:outline-none pl-2"
          placeholder="Search"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
    );
  }

  return null;
}
