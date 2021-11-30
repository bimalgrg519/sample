import React, { useEffect } from "react";
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
import { useForm } from "react-hook-form";

export default function AddEditTimeEntryModal({
  isOpen,
  close,
  refetchLines,
  selectedTableRow,
}) {
  const { setIsAppLoading } = useContextConsumer();
  const { successToast, errorToast } = useToasts();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    getValues,
  } = useForm();

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

  useEffect(() => {
    if (selectedTableRow) {
      setValue("hoursWorked", getHours(selectedTableRow));
      setValue("dateWorked", selectedTableRow.startDate);
      setValue(
        "allowanceType",
        getAllowanceTypeByWorkedHours(selectedTableRow)
      );
      setValue("projectDescription", selectedTableRow.remarks);
    }
  }, [selectedTableRow, setValue]);

  const resetState = () => {
    setValue("hoursWorked", "");
    setValue("dateWorked", "");
    setValue("allowanceType", "");
    setValue("projectDescription", "");
  };

  const closeModal = () => {
    close();
    resetState();
    clearErrors();
  };

  const onSubmit = (data) => {
    const { hoursWorked, dateWorked, allowanceType, projectDescription } = data;

    setIsAppLoading(true);
    closeModal();

    let workedhours = {};
    for (let index = 0; index <= 10; index++) {
      const workedHr = `workedHours_${index}`;
      workedhours = {
        ...workedhours,
        [workedHr]: allowanceType === workedHr ? Number(hoursWorked) : 0,
      };
    }

    if (selectedTableRow) {
      const body = {
        startDate: dateWorked,
        endDate: dateWorked,
        remarks: projectDescription,
        ...workedhours,
      };
      mutatePatchLines({ id: selectedTableRow.id, body });
    } else {
      const body = {
        documentNo,
        employeeCode,
        startDate: dateWorked,
        endDate: dateWorked,
        site,
        remarks: projectDescription,
        ...workedhours,
      };
      mutatePostLines(body);
    }
  };

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <p className="text-primaryDarkBlue font-bold text-4xl">Add Entry</p>
      <form
        className="mt-4 grid grid-cols-2 gap-4 min-w-xs sm:min-w-xl md:min-w-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-2 md:col-span-1">
          <label htmlFor="hoursWorked" className="form-label">
            Number of hours worked <span className="text-red-700">*</span>
          </label>
          <input
            id="hoursWorked"
            className="appearance-none border border-blue-200 py-2 px-4 rounded-sm w-full"
            type="number"
            {...register("hoursWorked", { required: "This is required" })}
          />
          {errors.hoursWorked && (
            <span className="text-red-700 font-medium mt-4">
              {errors.hoursWorked.message}
            </span>
          )}
          {getValues("hoursWorked") === "0" && (
            <span className="text-red-700 font-medium mt-4">
              This is required
            </span>
          )}
        </div>
        <div className="col-span-2 md:col-span-1">
          <label htmlFor="dateWorked" className="form-label">
            Date worked <span className="text-red-700">*</span>
          </label>
          <select
            id="dateWorked"
            className="w-full border border-blue-200 py-2 cursor-pointer"
            {...register("dateWorked", { required: "This is required" })}
          >
            <option value="">Select Date</option>
            {getDateWorkedList(startDate, endDate).map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
          {errors.dateWorked && (
            <span className="text-red-700 font-medium mt-4">
              {errors.dateWorked.message}
            </span>
          )}
        </div>
        <div className="col-span-2 md:col-span-1">
          <label htmlFor="allowanceType" className="form-label">
            Allowance type <span className="text-red-700">*</span>
          </label>
          <select
            id="allowanceType"
            className="w-full border border-blue-200 py-2 cursor-pointer"
            {...register("allowanceType", { required: "This is required" })}
          >
            <option value="">Select Allowance Type</option>
            {fieldConfigurations?.map((d) => (
              <option key={d.id} value={d.description2}>
                {d.description}
              </option>
            ))}
          </select>
          {errors.allowanceType && (
            <span className="text-red-700 font-medium mt-4">
              {errors.allowanceType.message}
            </span>
          )}
        </div>
        <div className="col-span-2">
          <label htmlFor="projectDescription" className="form-label">
            project Description
          </label>
          <textarea
            id="projectDescription"
            className="w-full border border-blue-200 p-2"
            {...register("projectDescription")}
            rows={5}
          />
        </div>
        <div className="col-span-2">
          <button className="btn btn-primary btn-full mt-4" type="submit">
            {selectedTableRow ? "Update" : "Add New"} Entry
          </button>
        </div>
      </form>
    </Modal>
  );
}
