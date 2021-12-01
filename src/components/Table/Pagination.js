import React, { useState, useEffect } from "react";

function Pagination({ rawList, fetchPaginatedList }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);

  const [pageNumber, setPageNumber] = useState([]);

  const indexOfLastPage = currentPage * dataPerPage;
  const indexOfFirstPage = indexOfLastPage - dataPerPage;

  const paginatedList = rawList?.slice(indexOfFirstPage, indexOfLastPage);

  const changePaginationNumber = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    if (rawList.length > 0) {
      fetchPaginatedList(paginatedList);
    }
  }, [currentPage, rawList]);

  useEffect(() => {
    setPageNumber(
      [...Array(Math.ceil(rawList?.length / dataPerPage)).keys()].map(
        (x) => ++x
      )
    );
  }, [rawList, dataPerPage]);

  return (
    <nav className="relative">
      <ul className="inline-flex absolute left-1/2 top-1 -space-x-px">
        {pageNumber?.map((number) => (
          <li key={number}>
            <span
              className={`${
                currentPage === number
                  ? "bg-blue-400 text-white"
                  : "bg-white text-gray-500"
              } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              role="button"
              onClick={() => changePaginationNumber(number)}
            >
              {number}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
