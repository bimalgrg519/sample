import React, { useState } from "react";
import { Modal } from "../../components";
import { useContextConsumer } from "../../AppContext";

export default function RejectModal({ isOpen, close, onSubmit }) {
  const { setIsAppLoading } = useContextConsumer();
  const [rejectReason, setRejectReason] = useState("");

  const handleRejectReason = () => {
    if (rejectReason) {
      close();
      setIsAppLoading(true);
      onSubmit({ status: "Open", remarks: rejectReason });
    }
  };

  const closeRejectModal = () => {
    close();
    setRejectReason("");
  };

  return (
    <Modal isOpen={isOpen} close={closeRejectModal}>
      <div className="pt-6">
        <label htmlFor="rejectReason" className="form-label">
          Reason of Rejection <span className="text-red-700">*</span>
        </label>
        <textarea
          id="rejectReason"
          value={rejectReason}
          className="w-full border border-blue-200 p-2"
          rows={5}
          onChange={(e) => setRejectReason(e.target.value)}
        />
      </div>
      <div className="flex space-x-2">
        <button className="btn btn-outline" onClick={closeRejectModal}>
          Cancel
        </button>
        <button
          className={`btn btn-primary ${
            !rejectReason && "opacity-50 cursor-not-allowed"
          }`}
          onClick={handleRejectReason}
        >
          Reject
        </button>
      </div>
    </Modal>
  );
}
