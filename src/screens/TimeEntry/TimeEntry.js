import React from "react";
import { Loader, LinesTable } from "../../components";
import useLines from "../../hooks/useLines";
import { useLocation } from "react-router-dom";
import useFieldConfigurations from "../../hooks/useFieldConfigurations";
import { useContextConsumer } from "../../AppContext";
import ButtonGroup from "./ButtonGroup";
import AddTimeEntryButton from "./AddTimeEntryButton";

const RemarksMessage = ({ remarks }) =>
  remarks && (
    <div className="mt-5 bg-red-100 p-4 rounded text-red-900">{remarks}</div>
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
  const { data: fieldConfigurations } = useFieldConfigurations();

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
      <LinesTable fieldConfigurations={fieldConfigurations} data={linesData} />
      <AddTimeEntryButton
        status={status}
        fieldConfigurations={fieldConfigurations}
        refetchLines={refetchLines}
      />
    </div>
  );
}
