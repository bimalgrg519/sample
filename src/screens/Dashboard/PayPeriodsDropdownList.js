import moment from "moment";
import React from "react";
import { useContextConsumer } from "../../AppContext";

export default function PayPeriodsDropdownList({
  data,
  selectedPayPeriod,
  setSelectedPayPeriod,
}) {
  const { setIsAppLoading } = useContextConsumer();

  return (
    <div className="mb-4">
      <select
        className="border border-blue-200 w-64 py-2 cursor-pointer"
        value={selectedPayPeriod.id}
        onChange={(e) => {
          setIsAppLoading(true);
          setSelectedPayPeriod(data?.find((d) => d.id === e.target.value));
        }}
      >
        <option disabled value="">
          Select Date
        </option>
        {data?.map(({ id, startDate, endDate }) => (
          <option key={id} value={id}>
            {moment(startDate).format("DD-MM-YYYY")} -{" "}
            {moment(endDate).format("DD-MM-YYYY")}
          </option>
        ))}
      </select>
    </div>
  );
}
