import React, { useState } from "react";
import { useContextConsumer } from "../../AppContext";
import SubmitModal from "./SubmitModal";
import usePatchHeaders from "../../hooks/usePatchHeaders";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import RejectModal from "./RejectModal";
import ApproveModal from "./ApproveModal";
import useToasts from "../../hooks/useToasts";

export default function ButtonGroup({ status, remarks, id }) {
  const { isManager, setIsAppLoading } = useContextConsumer();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const history = useHistory();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const { successToast, errorToast } = useToasts();

  const [selectedButton, setSelectedButton] = useState(null);

  const { mutate: mutatePatchHeaders } = useMutation(usePatchHeaders, {
    onSuccess: () => {
      setIsAppLoading(false);
      history.goBack();

      if (selectedButton === "Submit") {
        successToast("Submitted Successfully");
      } else if (selectedButton === "Reject") {
        successToast("Rejected Successfully");
      } else if (selectedButton === "Approve") {
        successToast("Approved Successfully");
      }
    },
    onError: () => {
      setIsAppLoading(false);
      errorToast("Sorry, Something went wrong.");
    },
  });

  const handlePatchHeaders = (body) => {
    mutatePatchHeaders({
      id,
      body,
    });
  };

  if (status === "Open" && !isManager) {
    return (
      <>
        <SubmitModal
          id={id}
          isOpen={isSubmitModalOpen}
          close={() => setIsSubmitModalOpen(false)}
          patchHeaders={handlePatchHeaders}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            setIsSubmitModalOpen(true);
            setSelectedButton("Submit");
          }}
        >
          Submit
        </button>
      </>
    );
  }

  if (isManager && status !== "Released") {
    return (
      <div className="flex items-center space-x-2">
        <RejectModal
          id={id}
          isOpen={isRejectModalOpen}
          close={() => setIsRejectModalOpen(false)}
          patchHeaders={handlePatchHeaders}
        />
        <ApproveModal
          isOpen={isApproveModalOpen}
          close={() => setIsApproveModalOpen(false)}
          patchHeaders={handlePatchHeaders}
        />
        {!remarks && (
          <button
            className="btn btn-outline"
            onClick={() => {
              setIsRejectModalOpen(true);
              setSelectedButton("Reject");
            }}
          >
            Reject
          </button>
        )}
        <button
          className="btn btn-primary"
          onClick={() => {
            setIsApproveModalOpen(true);
            setSelectedButton("Approve");
          }}
        >
          Approve
        </button>
      </div>
    );
  }

  return null;
}
