import React from "react";
import { useHistory } from "react-router-dom";
import { useContextConsumer } from "../../AppContext";
import { Loader } from "../../components";
import useHeaders from "../../hooks/useHeaders";

export const getHours = (d) => {
  let totalHours = 0;
  for (let index = 0; index <= 10; index++) {
    totalHours = totalHours + d[`workedHours_${index}`];
  }
  return totalHours;
};

export default function App() {
  const history = useHistory();
  const { userCode } = useContextConsumer();

  const { isLoading, data } = useHeaders(
    `?$filter=employeeCode eq '${userCode}'`
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="text-3xl font-bold text-primaryBlue">
          My Time Entries
        </span>
        {/* <button
          className="btn btn-primary"
          onClick={() => history.push("newEntry")}
        >
          Add Entry
        </button> */}
      </div>
      <table className="w-full mt-10 table-fixed shadow">
        <thead>
          <tr className="text-left bg-primaryDarkBlue text-white uppercase">
            <th className="py-3 pl-10">Submission Date</th>
            <th className="py-3">No. Of Hours Worked</th>
            <th className="py-3">Manager</th>
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
              <td className="py-3">{getHours(d)}</td>
              <td className="py-3">{d.managerCode}</td>
              <td className="py-3">{d.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
