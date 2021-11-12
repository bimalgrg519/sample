import React from "react";
import { useHistory } from "react-router-dom";
import { useContextConsumer } from "../../AppContext";

export const getHours = (d) => {
  let totalHours = 0;
  for (let index = 0; index <= 10; index++) {
    totalHours = totalHours + d[`workedHours_${index}`];
  }
  return totalHours;
};

export default ({ data }) => {
  const history = useHistory();

  const { isManager } = useContextConsumer();

  return (
    <table className="w-full table-fixed shadow">
      <thead>
        <tr className="text-left bg-primaryDarkBlue text-white uppercase">
          <th className="py-3 pl-10">Start Date</th>
          <th className="py-3 pl-10">End Date</th>
          <th className="py-3">No. Of Hours Worked</th>
          <th className="py-3">{isManager ? "Employee" : "Manager"}</th>
          <th className="py-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr
            key={d.id}
            className="even:bg-lightGreen font-helvetica cursor-pointer"
            onClick={() => history.push("timeEntry", { data: d })}
          >
            <td className="py-3 pl-10">{d.startDate}</td>
            <td className="py-3 pl-10">{d.endDate}</td>
            <td className="py-3">{getHours(d)}</td>
            <td className="py-3">
              {isManager ? d.employeeName : d.managerCode}
            </td>
            <td className="py-3">{d.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
