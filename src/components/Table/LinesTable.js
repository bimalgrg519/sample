import React, { useState } from "react";
import { getHours } from "./TableCommon";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import DeleteTimeEntryModal from "./DeleteTimeEntryModal";
import AddEditTimeEntryModal from "./AddEditTimeEntryModal";
import useFieldConfigurations from "../../hooks/useFieldConfigurations";
import { useContextConsumer } from "../../AppContext";

export default function LinesTable({ data, refetchLines, status }) {
  const { isManager } = useContextConsumer();

  const [isDeleteTimeEntryOpen, setIsDeleteTimeEntryOpen] = useState(false);
  const [isAddEditTimeEntryOpen, setIsAddEditTimeEntryOpen] = useState(false);

  const [selectedTableRow, setSelectedTableRow] = useState({});

  const { data: fieldConfigurations } = useFieldConfigurations();

  const getAllowanceTypeTitle = (entry) => {
    return fieldConfigurations?.find((d) => entry[d.description2])?.description;
  };

  // dont show zero hours worked
  const filteredData = data.filter((d) => getHours(d) > 0);

  return (
    <div className="px-1 overflow-x-auto">
      <DeleteTimeEntryModal
        isOpen={isDeleteTimeEntryOpen}
        close={() => setIsDeleteTimeEntryOpen(false)}
        id={selectedTableRow.id}
        refetchLines={refetchLines}
      />
      <AddEditTimeEntryModal
        isOpen={isAddEditTimeEntryOpen}
        close={() => setIsAddEditTimeEntryOpen(false)}
        selectedTableRow={selectedTableRow}
        refetchLines={refetchLines}
      />

      <table className="w-full mt-5 table-auto md:table-fixed whitespace-nowrap text-center shadow">
        <thead>
          <tr className=" bg-primaryDarkBlue text-white uppercase">
            <th className=" py-2 md:py-3 px-3 md:px-0">Date</th>
            <th className="hidden md:block py-3 px-0">No. of Hours Worked</th>
            <th className="md:hidden block px-3 py-2">Hours Worked</th>
            <th className="py-2 md:py-3 px-3 md:px-0">Allowance Type</th>
            <th className="hidden md:block py-3 px-0">
              Project Description of Work
            </th>
            <th className="block md:hidden py-2 px-3">Work Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((d) => (
            <tr key={d.id} className="even:bg-lightGreen font-helvetica">
              <td className="py-2 md:py-3 px-3 md:px-0">{d.startDate}</td>
              <td className="py-2 px-3">{getHours(d)}</td>
              <td className="py-2 md:py-3 px-3 md:px-0">
                {getAllowanceTypeTitle(d)}
              </td>
              <td className="hidden md:block py-3 px-0">{d.remarks}</td>
              <td className="block md:hidden py-2 px-3">
                {d.remarks}
                {(!isManager && status === "Open") ||
                (isManager && status === "Pending Approval") ? (
                  <div className="invisible absolute h-full top-0 right-0 bg-white group-hover:visible flex items-center text-2xl px-2">
                    <div
                      className="px-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 py-2 rounded-full cursor-pointer"
                      onClick={() => {
                        setSelectedTableRow(d);
                        setIsDeleteTimeEntryOpen(true);
                      }}
                    >
                      <AiFillDelete />
                    </div>
                    <div
                      className="px-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 py-2 rounded-full cursor-pointer"
                      onClick={() => {
                        setSelectedTableRow(d);
                        setIsAddEditTimeEntryOpen(true);
                      }}
                    >
                      <AiFillEdit />
                    </div>
                  </div>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
