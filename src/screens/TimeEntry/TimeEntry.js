import React, { useState } from "react";
import { Loader } from "../../components";
import useLines from "../../hooks/useLines";
import { useLocation, useHistory } from "react-router-dom";
import useFieldConfigurations from "../../hooks/useFieldConfigurations";
import usePatchHeaders from "../../hooks/usePatchHeaders";
import { useMutation } from "react-query";
import { useContextConsumer } from "../../AppContext";
import { getHours } from "../../components/Table/HeadersTable";
import SubmitModal from "./SubmitModal";
import AddTimeEntryModal from "./AddTimeEntryModal";
import RejectModal from "./RejectModal";
import ApproveModal from "./ApproveModal";

export default function TimeEntry() {
  const {
    state: {
      data: { id, startDate, endDate, employeeCode, status, remarks },
    },
  } = useLocation();
  const history = useHistory();
  const { setIsAppLoading, isManager, userCode } = useContextConsumer();

  const [isAddTimeEntryModalOpen, setIsTimeEntryModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

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

  const { mutate: mutatePatchHeaders } = useMutation(usePatchHeaders, {
    onSuccess: () => {
      setIsAppLoading(false);
      history.goBack();
    },
    onError: () => {
      setIsAppLoading(false);
      alert("Something went wrong.");
    },
  });

  const handlePatchHeaders = (body) => {
    mutatePatchHeaders({
      id,
      body,
    });
  };

  const getAllowanceTypeTitle = (entry) => {
    return fieldConfigurations?.find((d) => entry[d.description2])?.description;
  };

  if (isLoadingLines) {
    return <Loader />;
  }

  return (
    <div>
      <AddTimeEntryModal
        isOpen={isAddTimeEntryModalOpen}
        close={() => setIsTimeEntryModalOpen(false)}
        fieldConfigurations={fieldConfigurations}
        refetchLines={refetchLines}
      />
      <RejectModal
        id={id}
        isOpen={isRejectModalOpen}
        close={() => setIsRejectModalOpen(false)}
        patchHeaders={handlePatchHeaders}
      />
      <SubmitModal
        id={id}
        isOpen={isSubmitModalOpen}
        close={() => setIsSubmitModalOpen(false)}
        patchHeaders={handlePatchHeaders}
      />
      <ApproveModal
        isOpen={isApproveModalOpen}
        close={() => setIsApproveModalOpen(false)}
        patchHeaders={handlePatchHeaders}
      />
      <div className="flex justify-between">
        <span className="text-3xl font-bold text-primaryBlue">
          Weekly Time Entries
        </span>
        {isManager && status !== "Released" && (
          <div className="flex items-center space-x-2">
            <button
              className="btn btn-outline"
              onClick={() => setIsRejectModalOpen(true)}
            >
              Reject
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setIsApproveModalOpen(true)}
            >
              Approve
            </button>
          </div>
        )}
        {!isManager && status === "Open" && (
          <button
            className="btn btn-primary"
            onClick={() => setIsSubmitModalOpen(true)}
          >
            Submit
          </button>
        )}
      </div>
      {remarks ? (
        <div className="mt-5 bg-red-100 p-4 rounded text-red-900">
          {remarks}
        </div>
      ) : null}

      <table className="w-full mt-5 table-fixed">
        <thead>
          <tr className="text-left bg-primaryDarkBlue text-white uppercase">
            <th className="py-3 pl-10">Date</th>
            <th className="py-3">No. Of Hours Worked</th>
            <th className="py-3">Allowance Type</th>
            <th className="py-3">Project Description Of Work</th>
          </tr>
        </thead>
        <tbody>
          {linesData.map((d) => (
            <tr key={d.id} className="even:bg-lightGreen font-helvetica">
              <td className="py-3 pl-10">{d.startDate}</td>
              <td className="py-3">{getHours(d)}</td>
              <td className="py-3">{getAllowanceTypeTitle(d)}</td>
              <td className="py-3">{d.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!isManager && status === "Open" && (
        <div
          className="flex justify-center py-3 mt-2 cursor-pointer font-bold text-sm text-primaryBlue"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%230000004A' stroke-width='2' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
          }}
          onClick={() => setIsTimeEntryModalOpen(true)}
        >
          ADD TIME ENTRY +
        </div>
      )}
    </div>
  );
}
