import React from "react";

export default function App() {
  return (
    <div className="h-screen w-screen bg-gray-100">
      <div className="bg-white">
        <div className="mx-auto w-container flex justify-center items-center py-3 relative">
          <span className="text-sm">3T Enerty Group</span>
          <div className="w-8 h-8 bg-gray-300 rounded-full absolute right-0" />
        </div>
      </div>
      <div className="w-container mx-auto py-10">
        <div className="flex justify-between">
          <span className="text-3xl font-medium">My Time Entries</span>
          <button className="btn btn-primary">Add Entry</button>
        </div>
        <table className="w-full mt-10 table-fixed shadow-sm">
          <thead>
            <tr className="text-left bg-gray-300">
              <th className="py-3 pl-10">Submission Date</th>
              <th className="py-3">Total No. Of Hours Worked</th>
              <th className="py-3">Manager</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array(12)
              .fill("")
              .map((d, index) => (
                <tr
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                >
                  <td className="py-3 pl-10">18-05-2021</td>
                  <td className="py-3">30 Hrs</td>
                  <td className="py-3">Foo Bar</td>
                  <td className="py-3">Approval waiting</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
