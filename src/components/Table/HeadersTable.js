import moment from "moment";
import React from "react";
import { useHistory } from "react-router-dom";
import { Loader } from "..";
import { useContextConsumer } from "../../AppContext";
import { getHours } from "./TableCommon";

export default function HeadersTable({
  data,
  isSuccess,
  isMyTimeEntriesSelected,
}) {
  const history = useHistory();
  const { isManager } = useContextConsumer();

  return (
    <div className="px-1 pb-1 overflow-x-auto">
      <table className="w-full table-auto shadow whitespace-nowrap text-left text-sm sm:text-base">
        <thead>
          <tr className="bg-primaryDarkBlue text-white uppercase">
            <th className="py-2 sm:py-3 px-4">Start Date</th>
            <th className="py-2 sm:py-3 px-4">End Date</th>
            <th className="py-2 sm:py-3 px-4">Hours Worked</th>
            <th className="py-2 sm:py-3 px-4">
              {isManager && !isMyTimeEntriesSelected
                ? "Employee"
                : "Manager Code"}
            </th>
            <th className="py-2 sm:py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess && data?.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-3 text-center">
                Not Available
              </td>
            </tr>
          ) : null}
          {!isSuccess && data?.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-3 text-center">
                <div className="inline-block">
                  <Loader />
                </div>
              </td>
            </tr>
          ) : (
            data?.map((d) => {
              return (
                <tr
                  key={d.id}
                  className="even:bg-lightGreen font-helvetica cursor-pointer whitespace-nowrap"
                  onClick={() =>
                    history.push("timeEntry", {
                      data: d,
                      isMyTimeEntriesSelected,
                    })
                  }
                >
                  <td className="py-2 sm:py-3 px-4">
                    {d.startDate && moment(d.startDate).format("DD-MM-YYYY")}
                  </td>
                  <td className="py-2 sm:py-3 px-4">
                    {d.endDate && moment(d.endDate).format("DD-MM-YYYY")}
                  </td>
                  <td className="py-2 sm:py-3 px-4">{getHours(d)}</td>
                  <td className="py-2 sm:py-3 px-4">
                    {isManager && !isMyTimeEntriesSelected
                      ? d.employeeName
                      : d.managerCode}
                  </td>
                  <td className="py-2 sm:py-3 px-4">
                    {d.remarks ? (
                      <span className="text-red-600">Rejected</span>
                    ) : (
                      d.status
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
