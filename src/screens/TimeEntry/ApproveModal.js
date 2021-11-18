import React from "react";
import { ConfirmModal } from "../../components";
import { useContextConsumer } from "../../AppContext";

export default function ApproveModal({ isOpen, close, onSubmit }) {
  const { setIsAppLoading } = useContextConsumer();

  const handleApprove = () => {
    setIsAppLoading(true);
    close();
    onSubmit({ status: "Released", remarks: "" });
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      close={close}
      title="Are you sure you want to approve?"
      btnText="Approve"
      onClickBtn={handleApprove}
    />
  );
}
