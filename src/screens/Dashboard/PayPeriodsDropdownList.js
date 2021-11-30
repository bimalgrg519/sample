import React from "react";
import { useContextConsumer } from "../../AppContext";
import { changeDateToUkFormat } from "../../utils/changeDateToUkFormat";

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
            {changeDateToUkFormat(startDate)} - {changeDateToUkFormat(endDate)}
          </option>
        ))}
      </select>
    </div>
  );
}
