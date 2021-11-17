import React from "react";
import { Modal } from "../../components";
import { useContextConsumer } from "../../AppContext";
import useDeleteLine from "../../hooks/useDeleteLine";
import { useMutation } from "react-query";

export default function DeleteTimeEntryModal({ isOpen, close, patchHeaders }) {
  const { setIsAppLoading } = useContextConsumer();

  const handleDelete = () => {
    setIsAppLoading(true);
    close();
    patchHeaders({
      status: "Released",
      remarks: "",
    });
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      <div style={{ width: 500 }}>
        <p className="text-xl">Are you sure you want to delete?</p>
        <div className="space-x-2 mt-5">
          <button className="btn btn-outline" onClick={close}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
