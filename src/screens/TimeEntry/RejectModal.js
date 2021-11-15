import React, { useState } from "react";
import { Modal } from "../../components";
import { useContextConsumer } from "../../AppContext";

export default function RejectModal({ id, isOpen, close, patchHeaders }) {
  const { setIsAppLoading } = useContextConsumer();
  const [rejectReason, setRejectReason] = useState("");

  const handleRejectReason = () => {
    close();
    setIsAppLoading(true);
    patchHeaders({
      status: "Open",
      remarks: rejectReason,
    });
  };

  const closeRejectModal = () => {
    close();
    setRejectReason("");
  };

  return (
    <Modal isOpen={isOpen} close={closeRejectModal}>
      <p className="text-primaryDarkBlue font-bold text-4xl">Reject</p>
      <div style={{ width: 750, marginTop: 40 }}>
        <div className="">
          <label htmlFor="rejectReason" className="form-label">
            Reason
          </label>
          <textarea
            id="rejectReason"
            value={rejectReason}
            className="w-full border border-blue-200 p-2"
            rows={5}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </div>
        <div className="space-x-2 mt-5">
          <button className="btn btn-outline" onClick={closeRejectModal}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleRejectReason}>
            Reject
          </button>
        </div>
      </div>
    </Modal>
  );
}
