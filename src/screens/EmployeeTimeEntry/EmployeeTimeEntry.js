import React, { useState } from "react";
import { Modal } from "../../components";

export default function NewEntry() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Modal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
        <p className="text-primaryDarkBlue font-bold text-4xl">Approval</p>
        <div style={{ width: 750, marginTop: 40 }}>
          <div className="flex">
            <div className="w-1/2 pr-3">
              <label for="Allowance" className="form-label">
                Allowance
              </label>
              <input
                id="Allowance"
                className="appearance-none border border-blue-200 py-2 px-4 rounded-sm w-full"
              />
            </div>
            <div className="w-1/2 pl-3">
              <label for="Allowance Type" className="form-label">
                Allowance Type
              </label>
              <input
                id="Allowance Type"
                className="appearance-none border border-blue-200 py-2 px-4 rounded-sm w-full"
              />
            </div>
          </div>

          <div className="mt-6">
            <label for="Comment" className="form-label">
              Comment
            </label>
            <textarea
              id="Comment"
              value=""
              onChange={() => {}}
              className="w-full border border-blue-200"
              rows={5}
            />
          </div>
          <button className="btn btn-primary btn-full mt-4" onClick={() => {}}>
            Approve Submission
          </button>
        </div>
      </Modal>
      <div className="flex justify-between">
        <span className="text-3xl font-bold text-primaryBlue">
          John's OT Entries
        </span>
        <div className="flex items-center">
          <button className="btn btn-outline mr-4">Reject</button>
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Approve
          </button>
        </div>
      </div>
      <table className="w-full mt-10 table-fixed">
        <thead>
          <tr className="text-left bg-primaryDarkBlue text-white uppercase">
            <th className="py-3 pl-10">Date</th>
            <th className="py-3">No. Of Hours Worked</th>
            <th className="py-3">Allowance Type</th>
            <th className="py-3">Project Description Of Work</th>
          </tr>
        </thead>
        <tbody>
          {Array(2)
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
      <div
        className="flex justify-center py-3 mt-2 cursor-pointer font-bold text-sm text-primaryBlue"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%230000004A' stroke-width='2' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
        }}
        onClick={() => setIsModalOpen(true)}
      >
        ADD TIME ENTRY +
      </div>
    </div>
  );
}
