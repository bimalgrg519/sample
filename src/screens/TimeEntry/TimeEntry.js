import React, { useState } from "react";
import { Loader, Modal } from "../../components";
import useLines from "../../hooks/useLines";
import { useLocation, useHistory } from "react-router-dom";
import { getHours } from "../Home/Home";
import moment from "moment";
import useFieldConfigurations from "../../hooks/useFieldConfigurations";
import usePostLines from "../../hooks/usePostLines";
import usePatchHeaders from "../../hooks/usePatchHeaders";
import { useMutation } from "react-query";
import { useContextConsumer } from "../../AppContext";

export default function NewEntry() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    state: {
      data: { id, startDate, endDate, employeeCode, documentNo, site },
    },
  } = useLocation();
  const history = useHistory();
  const { setIsAppLoading } = useContextConsumer();

  const [numberOfHoursWorked, setNumberOfHoursWorked] = useState("");
  const [selectedDateWorked, setSelectedDateWorked] = useState("");
  const [selectedAllowanceType, setSelectedAllowanceType] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const {
    isLoading: isLoadingLines,
    data: linesData,
    refetch: refetchLines,
  } = useLines(
    `?$filter=employeeCode eq '${employeeCode}' and startDate ge ${startDate} and endDate le ${endDate}`
  );
  const { data: fieldConfigurations } = useFieldConfigurations();
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

  const resetState = () => {
    setNumberOfHoursWorked("");
    setSelectedDateWorked("");
    setSelectedAllowanceType("");
    setProjectDescription("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  const getAllowanceTypeTitle = (entry) => {
    return fieldConfigurations.find((d) => entry[d.description2])?.description;
  };

  const handleAddNewEntry = () => {
    if (!numberOfHoursWorked) {
      alert("No of hours worked is required.");
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

  const handleSubmit = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to submit?")) {
      setIsAppLoading(true);
      mutatePatchHeaders({
        id,
        body: {
          status: "Pending Approval",
        },
      });
    }
  };

  if (isLoadingLines) {
    return <Loader />;
  }

  return (
    <div>
      <Modal isOpen={isModalOpen} close={closeModal}>
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
                onChange={(e) => setNumberOfHoursWorked(e.target.value)}
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
      <div className="flex justify-between">
        <span className="text-3xl font-bold text-primaryBlue">
          Weekly Time Entries
        </span>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
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
