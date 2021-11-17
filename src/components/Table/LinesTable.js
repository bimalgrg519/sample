import React from "react";
import { getHours } from "./TableCommon";

export default function LinesTable({ data, fieldConfigurations }) {
  const getAllowanceTypeTitle = (entry) => {
    return fieldConfigurations?.find((d) => entry[d.description2])?.description;
  };

  // dont show zero hours worked
  const filteredData = data.filter((d) => getHours(d) > 0);

  return (
    <table className="w-full mt-5 table-fixed shadow">
      <thead>
        <tr className="text-left bg-primaryDarkBlue text-white uppercase">
          <th className="py-3 pl-10">Date</th>
          <th className="py-3">No. Of Hours Worked</th>
          <th className="py-3">Allowance Type</th>
          <th className="py-3">Project Description Of Work</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((d) => (
          <tr
            key={d.id}
            className="even:bg-lightGreen font-helvetica cursor-pointer"
          >
            <td className="py-3 pl-10">{d.startDate}</td>
            <td className="py-3">{getHours(d)}</td>
            <td className="py-3">{getAllowanceTypeTitle(d)}</td>
            <td className="py-3">{d.remarks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
