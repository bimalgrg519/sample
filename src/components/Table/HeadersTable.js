import React from "react";
import { useHistory } from "react-router-dom";
import { Loader } from "..";
import { useContextConsumer } from "../../AppContext";
import { changeDateToUkFormat } from "../../utils/changeDateToUkFormat";
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
      <table className="w-full table-auto shadow whitespace-nowrap">
        <thead>
          <tr className="bg-primaryDarkBlue text-white uppercase text-center">
            <th className="sm:py-2 py-3 px-2 md:px-0">Start Date</th>
            <th className="px-2 md:px-0">End Date</th>
            <th className="px-2 py-3 md:px-0 md:block hidden">
              No. of Hours Worked
            </th>
            <th className="px-2 py-3 md:hidden block">Hours Worked</th>
            <th className="px-2 md:px-0">
              {isManager ? "Employee" : "Manager Code"}
            </th>
            <th className="px-2 md:px-0">Status</th>
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
                  className="even:bg-lightGreen font-helvetica cursor-pointer text-center whitespace-nowrap"
                  onClick={() =>
                    history.push("timeEntry", {
                      data: d,
                      isMyTimeEntriesSelected,
                    })
                  }
                >
                  <td className="sm:py-2 py-3 px-2 md:px-0">
                    {changeDateToUkFormat(d.startDate)}
                  </td>
                  <td className="px-2 md:px-0">
                    {changeDateToUkFormat(d.endDate)}
                  </td>
                  <td className="px-2 md:px-0 py-2 md:py-3">{getHours(d)}</td>
                  <td className="px-2 md:px-0">
                    {isManager ? d.employeeName : d.managerCode}
                  </td>
                  <td className="px-2 md:px-0">
                    {d.remarks ? (
                      <span className="text-red-600">(Rejected)</span>
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
