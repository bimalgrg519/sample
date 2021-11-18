import React from "react";
import Modal from "../Modal/Modal";

export default function ConfirmModal({
  isOpen,
  close,
  title,
  btnText,
  onClickBtn,
}) {
  return (
    <Modal isOpen={isOpen} close={close}>
      <p className="text-base md:text-xl">{title}</p>
      <div className="flex space-x-2 mt-5">
        <button className="btn btn-outline" onClick={close}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={onClickBtn}>
          {btnText}
        </button>
      </div>
    </Modal>
  );
}
