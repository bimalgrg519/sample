import React, { useState, useEffect } from "react";
import { Modal } from "..";
import { useContextConsumer } from "../../AppContext";
import { useLocation } from "react-router-dom";
import usePostLines from "../../hooks/usePostLines";
import { useMutation } from "react-query";
import useFieldConfigurations from "../../hooks/useFieldConfigurations";
import {
  getHours,
  getAllowanceTypeByWorkedHours,
  getDateWorkedList,
} from "./TableCommon";
import usePatchLines from "../../hooks/usePatchLines";
import useToasts from "../../hooks/useToasts";

export default function AddEditTimeEntryModal({
  isOpen,
  close,
  refetchLines,
  selectedTableRow,
}) {
  const { setIsAppLoading } = useContextConsumer();
  const { successToast, errorToast } = useToasts();

  const {
    state: {
      data: { startDate, endDate, employeeCode, documentNo, site },
    },
  } = useLocation();

  const { data: fieldConfigurations } = useFieldConfigurations();

  const handleSuccess = () => {
    setIsAppLoading(false);
    resetState();
    refetchLines();
  };

  const { mutate: mutatePostLines } = useMutation(usePostLines, {
    onSuccess: () => {
      handleSuccess();
      successToast("Added Successfully");
    },
    onError: () => {
      setIsAppLoading(false);
      errorToast("Sorry, Something went wrong.");
    },
  });

  const { mutate: mutatePatchLines } = useMutation(usePatchLines, {
    onSuccess: () => {
      handleSuccess();
      successToast("Updated Successfully");
    },
    onError: () => {
      setIsAppLoading(false);
      errorToast("Sorry, Something went wrong.");
    },
  });

  const [numberOfHoursWorked, setNumberOfHoursWorked] = useState("");
  const [selectedDateWorked, setSelectedDateWorked] = useState("");
  const [selectedAllowanceType, setSelectedAllowanceType] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  useEffect(() => {
    if (selectedTableRow) {
      setNumberOfHoursWorked(getHours(selectedTableRow));
      setSelectedDateWorked(selectedTableRow.startDate);
      setSelectedAllowanceType(getAllowanceTypeByWorkedHours(selectedTableRow));
      setProjectDescription(selectedTableRow.remarks);
    }
  }, [selectedTableRow]);

  const resetState = () => {
    setNumberOfHoursWorked("");
    setSelectedDateWorked("");
    setSelectedAllowanceType("");
    setProjectDescription("");
  };

  const closeModal = () => {
    close();
    resetState();
  };

  const handleAddNewEntry = () => {
    if (!numberOfHoursWorked || numberOfHoursWorked === 0) {
      alert("Number of hours worked is required.");
      return;
    } else if (!selectedDateWorked) {
      alert("Date worked is required.");
      return;
    } else if (!selectedAllowanceType) {
      alert("Allowance type is required.");
      return;
    }

    setIsAppLoading(true);
    closeModal();

    let workedhours = {};
    for (let index = 0; index <= 10; index++) {
      const workedHr = `workedHours_${index}`;
      workedhours = {
        ...workedhours,
        [workedHr]:
          selectedAllowanceType === workedHr ? Number(numberOfHoursWorked) : 0,
      };
    }

    const body = {
      documentNo,
      employeeCode,
      startDate: selectedDateWorked,
      endDate: selectedDateWorked,
      site,
      remarks: projectDescription,
      ...workedhours,
    };

    mutatePostLines(body);
  };

  const handleUpdateEntry = () => {
    if (!numberOfHoursWorked || numberOfHoursWorked === 0) {
      alert("Number of hours worked is required.");
      return;
    } else if (!selectedDateWorked) {
      alert("Date worked is required.");
      return;
    } else if (!selectedAllowanceType) {
      alert("Allowance type is required.");
      return;
    }

    setIsAppLoading(true);
    closeModal();

    let workedhours = {};
    for (let index = 0; index <= 10; index++) {
      const workedHr = `workedHours_${index}`;
      workedhours = {
        ...workedhours,
        [workedHr]:
          selectedAllowanceType === workedHr ? Number(numberOfHoursWorked) : 0,
      };
    }

    const body = {
      startDate: selectedDateWorked,
      endDate: selectedDateWorked,
      remarks: projectDescription,
      ...workedhours,
    };
    mutatePatchLines({ id: selectedTableRow.id, body });
  };

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <p className="text-primaryDarkBlue font-bold text-4xl">Add Entry</p>
      <div style={{ width: 750, marginTop: 40 }}>
        <div className="flex">
          <div className="w-1/2 pr-3">
            <label htmlFor="hoursWorked" className="form-label">
              Number of hours worked
            </label>
            <input
              id="hoursWorked"
              className="appearance-none border border-blue-200 py-2 px-4 rounded-sm w-full"
              value={numberOfHoursWorked}
              onChange={(e) => setNumberOfHoursWorked(Number(e.target.value))}
              type="number"
            />
          </div>
          <div className="w-1/2 pl-3">
            <label htmlFor="dateWorked" className="form-label">
              Date worked
            </label>
            <select
              id="dateWorked"
              className="w-full border border-blue-200 py-2 cursor-pointer"
              value={selectedDateWorked}
              onChange={(e) => setSelectedDateWorked(e.target.value)}
            >
              <option disabled value="">
                Select Date
              </option>
              {getDateWorkedList(startDate, endDate).map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-1/2 pr-3 mt-6">
          <label htmlFor="allowanceType" className="form-label">
            Allowance type
          </label>
          <select
            id="allowanceType"
            className="w-full border border-blue-200 py-2 cursor-pointer"
            value={selectedAllowanceType}
            onChange={(e) => setSelectedAllowanceType(e.target.value)}
          >
            <option disabled value="">
              Select Allowance Type
            </option>
            {fieldConfigurations?.map((d) => (
              <option key={d.id} value={d.description2}>
                {d.description}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6">
          <label htmlFor="projectDescription" className="form-label">
            project Description
          </label>
          <textarea
            id="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="w-full border border-blue-200 p-2"
            rows={5}
          />
        </div>
        {selectedTableRow ? (
          <button
            className="btn btn-primary btn-full mt-4"
            onClick={handleUpdateEntry}
          >
            Update Entry
          </button>
        ) : (
          <button
            className="btn btn-primary btn-full mt-4"
            onClick={handleAddNewEntry}
          >
            Add New Entry
          </button>
        )}
      </div>
    </Modal>
  );
}
