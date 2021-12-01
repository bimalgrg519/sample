import React, { useEffect } from "react";
import { LinesTable } from "../../components";
import useLines from "../../hooks/useLines";
import { useLocation, useHistory } from "react-router-dom";
import { useContextConsumer } from "../../AppContext";
import ButtonGroup from "./ButtonGroup";
import AddTimeEntryButton from "./AddTimeEntryButton";

const RemarksMessage = ({ remarks, isManager }) =>
  remarks ? (
    <div className="mt-4">
      <p className="text-red-900 font-medium">Reason of rejection</p>
      <div className="bg-red-100 px-4 py-2 rounded text-red-900 text-lg mb-2">
        {remarks}
      </div>
      {!isManager && (
        <p className="text-sm">
          * Please correct your time entry and resubmit.
        </p>
      )}
    </div>
  ) : null;

export default function TimeEntry() {
  const { state } = useLocation();

  const {
    data: { id, startDate, endDate, employeeCode, status, remarks },
  } = state || {
    data: {},
  };

  const history = useHistory();

  const { isManager, userCode, isMyTimeEntriesSelected } = useContextConsumer();

  const managerFilterUrl = `managerCode eq '${userCode}' and employeeCode eq '${employeeCode}'`;
  const employeeFilterUrl = `employeeCode eq '${userCode}'`;

  const {
    data: linesData,
    refetch: refetchLines,
    isLoading,
  } = useLines(
    `?$filter=${
      isManager && isMyTimeEntriesSelected === false
        ? managerFilterUrl
        : employeeFilterUrl
    } and startDate ge ${startDate} and endDate le ${endDate}`
  );

  useEffect(() => {
    if (!id) {
      history.push("/");
    }
  }, [history, id]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0">
        <span className="text-xl sm:text-3xl font-bold text-primaryBlue">
          Weekly Time Entries
        </span>
        <ButtonGroup
          status={status}
          remarks={remarks}
          id={id}
          linesData={linesData}
        />
      </div>
      <RemarksMessage remarks={remarks} isManager={isManager} />
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
