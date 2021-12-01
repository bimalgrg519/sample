import React, { useState, useEffect } from "react";

function Pagination({
  initialHeaderList,
  setHeaderList,
  numberOfItemsPerPage,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const tempTotalPages = Math.ceil(initialHeaderList.length / 10);
    setTotalPages(tempTotalPages);

    setHeaderList(initialHeaderList.slice(0, numberOfItemsPerPage));
  }, [initialHeaderList, numberOfItemsPerPage, setHeaderList]);

  return (
    <div className="flex justify-center mt-4">
      <ul className="flex mx-auto">
        {Array(totalPages)
          .fill("")
          .map((_, index) => (
            <li key={index}>
              <span
                className={`${
                  currentPage === index + 1
                    ? "bg-blue-400 text-white"
                    : "bg-white text-gray-500"
                } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                role="button"
                onClick={() => {
                  setCurrentPage(index + 1);
                  setHeaderList(
                    initialHeaderList.slice(
                      numberOfItemsPerPage * index,
                      numberOfItemsPerPage * (index + 1)
                    )
                  );
                }}
              >
                {index + 1}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Pagination;
