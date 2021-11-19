import React from "react";
import { LinesTable } from "../../components";
import useLines from "../../hooks/useLines";
import { useLocation } from "react-router-dom";
import { useContextConsumer } from "../../AppContext";
import ButtonGroup from "./ButtonGroup";
import AddTimeEntryButton from "./AddTimeEntryButton";

const RemarksMessage = ({ remarks }) =>
  remarks && (
    <div className="mt-4">
      <p className="text-red-900 font-medium">Reason for rejection</p>
      <div className="bg-red-100 px-4 py-2 rounded text-red-900 text-lg mb-2">
        {remarks}
      </div>
      <p className="text-sm">* Please correct your time entry and resubmit.</p>
    </div>
  );

export default function TimeEntry() {
  const {
    state: {
      data: { id, startDate, endDate, employeeCode, status, remarks },
    },
  } = useLocation();
  const { isManager, userCode } = useContextConsumer();

  const managerFilterUrl = `managerCode eq '${userCode}' and employeeCode eq '${employeeCode}'`;
  const employeeFilterUrl = `employeeCode eq '${userCode}'`;

  const {
    data: linesData,
    refetch: refetchLines,
    isLoading,
  } = useLines(
    `?$filter=${
      isManager ? managerFilterUrl : employeeFilterUrl
    } and startDate ge ${startDate} and endDate le ${endDate}`
  );

  return (
    <div>
      <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row justify-between text-center md:text-left">
        <span className="text-3xl font-bold text-primaryBlue">
          Weekly Time Entries
        </span>
        <div className="text-center">
          <ButtonGroup
            status={status}
            remarks={remarks}
            id={id}
            linesData={linesData}
          />
        </div>
      </div>
      <RemarksMessage remarks={remarks} />
      <LinesTable
        linesData={linesData}
        refetchLines={refetchLines}
        status={status}
        isLoading={isLoading}
      />
      <AddTimeEntryButton status={status} refetchLines={refetchLines} />
    </div>
  );
}
