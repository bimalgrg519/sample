import React from "react";
import { Loader, LinesTable } from "../../components";
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
    isLoading: isLoadingLines,
    data: linesData,
    refetch: refetchLines,
  } = useLines(
    `?$filter=${
      isManager ? managerFilterUrl : employeeFilterUrl
    } and startDate ge ${startDate} and endDate le ${endDate}`
  );

  if (isLoadingLines) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex justify-between">
        <span className="text-3xl font-bold text-primaryBlue">
          Weekly Time Entries
        </span>
        <ButtonGroup status={status} remarks={remarks} id={id} />
      </div>
      <RemarksMessage remarks={remarks} />
      <LinesTable
        data={linesData}
        refetchLines={refetchLines}
        status={status}
      />
      <AddTimeEntryButton status={status} refetchLines={refetchLines} />
    </div>
  );
}
