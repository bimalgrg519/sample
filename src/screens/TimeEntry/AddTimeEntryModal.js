import React, { useState } from "react";
import { Modal } from "../../components";
import moment from "moment";
import { useContextConsumer } from "../../AppContext";
import { useLocation } from "react-router-dom";
import usePostLines from "../../hooks/usePostLines";
import { useMutation } from "react-query";

export default function AddTimeEntryModal({
  isOpen,
  close,
  fieldConfigurations,
  refetchLines,
}) {
  const { setIsAppLoading } = useContextConsumer();

  const {
    state: {
      data: { startDate, endDate, employeeCode, documentNo, site },
    },
  } = useLocation();

  const { mutate: mutatePostLines } = useMutation(usePostLines, {
    onSuccess: () => {
      setIsAppLoading(false);
      resetState();
      refetchLines();
    },
    onError: () => {
      setIsAppLoading(false);
      alert("Something went wrong.");
    },
  });

  const [numberOfHoursWorked, setNumberOfHoursWorked] = useState("");
  const [selectedDateWorked, setSelectedDateWorked] = useState("");
  const [selectedAllowanceType, setSelectedAllowanceType] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const resetState = () => {
    setNumberOfHoursWorked("");
    setSelectedDateWorked("");
    setSelectedAllowanceType("");
    setProjectDescription("");
  };

  const closeAddTimeEntryModal = () => {
    close();
    resetState();
  };

  const getDateWorked = () => {
    let dateWorked = [];

    const start = moment(startDate, "YYYY-MM-DD");
    const end = moment(endDate, "YYYY-MM-DD");

    const diff = end.diff(start, "days");

    for (let index = 0; index <= diff; index++) {
      const formatedDay = moment(startDate, "YYYY-MM-DD")
        .clone()
        .add(index, "day")
        .format("YYYY-MM-DD");

      const dom = (
        <option key={formatedDay} value={formatedDay}>
          {formatedDay}
        </option>
      );
      dateWorked.push(dom);
    }

    return dateWorked;
  };

  const getAllowanceType = () => {
    return fieldConfigurations?.map((d) => {
      return (
        <option key={d.id} value={d.description2}>
          {d.description}
        </option>
      );
    });
  };

  const handleAddNewEntry = () => {
    console.log(typeof numberOfHoursWorked);
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
    closeAddTimeEntryModal();

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

  return (
    <Modal isOpen={isOpen} close={closeAddTimeEntryModal}>
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
              {getDateWorked()}
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
            {getAllowanceType()}
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
        <button
          className="btn btn-primary btn-full mt-4"
          onClick={handleAddNewEntry}
        >
          Add New Entry
        </button>
      </div>
    </Modal>
  );
}
