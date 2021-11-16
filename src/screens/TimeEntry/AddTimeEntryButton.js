import React, { useState } from "react";
import { useContextConsumer } from "../../AppContext";
import AddTimeEntryModal from "./AddTimeEntryModal";

export default function AddTimeEntryButton({
  status,
  fieldConfigurations,
  refetchLines,
}) {
  const { isManager } = useContextConsumer();

  const [isAddTimeEntryModalOpen, setIsTimeEntryModalOpen] = useState(false);

  if (!isManager && status === "Open")
    return (
      <>
        <AddTimeEntryModal
          isOpen={isAddTimeEntryModalOpen}
          close={() => setIsTimeEntryModalOpen(false)}
          fieldConfigurations={fieldConfigurations}
          refetchLines={refetchLines}
        />
        <div
          className="flex justify-center py-3 mt-2 cursor-pointer font-bold text-sm text-primaryBlue"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%230000004A' stroke-width='2' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
          }}
          onClick={() => setIsTimeEntryModalOpen(true)}
        >
          ADD TIME ENTRY +
        </div>
      </>
    );
  return null;
}
