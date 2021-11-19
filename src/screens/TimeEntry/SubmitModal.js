import React from "react";
import { Modal } from "../../components";
import { useContextConsumer } from "../../AppContext";

export default function SubmitModal({ isOpen, close, onSubmit }) {
  const { setIsAppLoading } = useContextConsumer();

  const handleSubmit = () => {
    setIsAppLoading(true);
    close();
    onSubmit({ status: "Pending Approval", remarks: "" });
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      <div style={{ width: 500 }}>
        <p className="text-xl">Are you sure you want to submit?</p>
        <div className="flex space-x-2 mt-5">
          <button className="btn btn-outline" onClick={close}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
}
