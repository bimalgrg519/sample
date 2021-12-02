import React, { useState } from "react";
import { getHours } from "./TableCommon";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import DeleteTimeEntryModal from "./DeleteTimeEntryModal";
import AddEditTimeEntryModal from "./AddEditTimeEntryModal";
import useFieldConfigurations from "../../hooks/useFieldConfigurations";
import { useContextConsumer } from "../../AppContext";
import { Loader } from "..";
import moment from "moment";

export default function LinesTable({
  linesData,
  refetchLines,
  status,
  isLoading,
}) {
  const { isManager, isMyTimeEntriesSelected } = useContextConsumer();

  const [isDeleteTimeEntryOpen, setIsDeleteTimeEntryOpen] = useState(false);
  const [isAddEditTimeEntryOpen, setIsAddEditTimeEntryOpen] = useState(false);

  const [selectedTableRow, setSelectedTableRow] = useState({});

  const { data: fieldConfigurations } = useFieldConfigurations();

  const getAllowanceTypeTitle = (entry) => {
    return fieldConfigurations?.find((d) => entry[d.description2])?.description;
  };

  // dont show zero hours worked
  const filteredLinesData = linesData
    ?.filter((d) => getHours(d) > 0)
    .map((d) => ({
      ...d,
      startDate: moment(d.startDate).format("DD-MM-YYYY"),
    }));

  let totalHours = filteredLinesData?.reduce((a, b) => a + getHours(b), 0);

  return (
    <div className="p-1 overflow-x-auto">
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
      <table className="w-full mt-5 table-auto shadow text-left text-sm sm:text-base">
        <thead>
          <tr className="bg-primaryDarkBlue text-white uppercase whitespace-nowrap">
            <th className="py-2 sm:py-3 px-4">Date</th>
            <th className="py-2 sm:py-3 px-4">Hours Worked</th>
            <th className="py-2 sm:py-3 px-4">Allowance Type</th>
            <th className="py-2 sm:py-3 px-4">Work Description</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading && filteredLinesData?.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-2 sm:py-3 text-center">
                Not Available
              </td>
            </tr>
          ) : null}
          {isLoading ? (
            <tr>
              <td colSpan={4} className="py-2 sm:py-3 text-center">
                <div className="inline-block">
                  <Loader />
                </div>
              </td>
            </tr>
          ) : null}
          {filteredLinesData?.map((d) => (
            <tr key={d.id} className="even:bg-lightGreen font-helvetica group">
              <td className="py-2 sm:py-3 px-4 whitespace-nowrap">
                {d.startDate}
              </td>
              <td className="py-2 sm:py-3 px-4">{getHours(d)}</td>
              <td className="py-2 sm:py-3 px-4">{getAllowanceTypeTitle(d)}</td>
              <td className="py-2 sm:py-3 px-4 relative min-w-xs">
                {d.remarks}
                {(!isManager && status === "Open") ||
                (isManager && status === "Pending Approval") ||
                (isMyTimeEntriesSelected && status === "Open") ? (
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
          {totalHours ? (
            <tr className="hover:shadow-none text-lg font-semibold bg-gray-100">
              <td className="py-2 sm:py-3 px-4">Total</td>
              <td className="py-2 sm:py-3 px-4" colSpan={3}>
                {totalHours} hrs
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
