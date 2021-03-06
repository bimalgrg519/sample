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
import moment from "moment";

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

  const { state } = useLocation();

  const {
    data: { startDate, endDate, employeeCode, documentNo, site },
  } = state || {
    data: {},
  };

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
        startDate: moment(dateWorked, "DD-MM-YYYY").format("YYYY-MM-DD"),
        endDate: moment(dateWorked, "DD-MM-YYYY").format("YYYY-MM-DD"),
        remarks: projectDescription,
        ...workedhours,
      };
      mutatePatchLines({ id: selectedTableRow.id, body });
    } else {
      const body = {
        documentNo,
        employeeCode,
        startDate: moment(dateWorked, "DD-MM-YYYY").format("YYYY-MM-DD"),
        endDate: moment(dateWorked, "DD-MM-YYYY").format("YYYY-MM-DD"),
        site,
        remarks: projectDescription,
        ...workedhours,
      };
      mutatePostLines(body);
    }
  };

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <p className="text-primaryDarkBlue font-bold text-4xl">
        {selectedTableRow ? "Update" : "Add"} Entry
      </p>
      <form
        className="mt-6 grid grid-cols-2 gap-4 min-w-xs sm:min-w-xl md:min-w-2xl"
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
            step="0.5"
            min="0"
            {...register("hoursWorked", {
              required: { value: true, message: "This is required" },
              pattern: {
                value: /^(\d|1\d|2[0-4])(\.\d{1,2})?$/,
                message: "Invalid time format.(0-24)",
              },
              max: { value: 24, message: "Value must not exceed 24" },
            })}
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
            {...register("projectDescription", {
              maxLength: 180,
            })}
            rows={3}
          />
          {errors.projectDescription?.type === "maxLength" && (
            <span className="text-red-700 font-medium mt-4">
              Maximum 180 characters is reached.
            </span>
          )}
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
