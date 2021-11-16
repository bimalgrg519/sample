import React from "react";
import { useHistory } from "react-router-dom";
import { useContextConsumer } from "../../AppContext";
import { getHours } from "./TableCommon";

export default function HeadersTable({ data }) {
  const history = useHistory();

  const { isManager } = useContextConsumer();

  return (
    <table className="w-full table-fixed shadow">
      <thead>
        <tr className="bg-primaryDarkBlue text-white uppercase">
          <th className="py-3 pl-10">Start Date</th>
          <th className="py-3 pl-10">End Date</th>
          <th className="py-3">No. Of Hours Worked</th>
          <th className="py-3">{isManager ? "Employee" : "Manager Code"}</th>
          <th className="py-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr
            key={d.id}
            className="even:bg-lightGreen font-helvetica cursor-pointer text-center"
            onClick={() => history.push("timeEntry", { data: d })}
          >
            <td className="py-3 pl-10">{d.startDate}</td>
            <td className="py-3 pl-10">{d.endDate}</td>
            <td className="py-3">{getHours(d)}</td>
            <td className="py-3">
              {isManager ? d.employeeName : d.managerCode}
            </td>
            <td className="py-3">
              {d.remarks ? (
                <span className="text-red-600">(Rejected)</span>
              ) : (
                d.status
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
