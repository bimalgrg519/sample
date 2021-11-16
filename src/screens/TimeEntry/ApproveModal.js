import React from "react";
import { Modal } from "../../components";
import { useContextConsumer } from "../../AppContext";

export default function ApproveModal({ isOpen, close, patchHeaders }) {
  const { setIsAppLoading } = useContextConsumer();

  const handleApprove = () => {
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
        <p className="text-xl">Are you sure you want to approve?</p>
        <div className="space-x-2 mt-5">
          <button className="btn btn-outline" onClick={close}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleApprove}>
            Approve
          </button>
        </div>
      </div>
    </Modal>
  );
}
