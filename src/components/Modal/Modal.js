import React from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
};

export default function MyModal({ isOpen, close, children }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={close} style={customStyles}>
      <div>
        <div className="absolute right-4 cursor-pointer" onClick={close}>
          <IoMdClose size={30} />
        </div>
        {children}
      </div>
    </Modal>
  );
}
