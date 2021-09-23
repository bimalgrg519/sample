import React from "react";
import { useHistory } from "react-router-dom";

export default function App() {
  const history = useHistory();

  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="text-3xl font-bold text-primaryBlue">
          My Time Entries
        </span>
        <button
          className="btn btn-primary"
          onClick={() => history.push("newEntry")}
        >
          Add Entry
        </button>
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
          {Array(12)
            .fill("")
            .map((d) => (
              <tr className="even:bg-lightGreen font-helvetica">
                <td className="py-3 pl-10">18-05-2021</td>
                <td className="py-3">30 Hrs</td>
                <td className="py-3">Foo Bar</td>
                <td className="py-3">Approval waiting</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
