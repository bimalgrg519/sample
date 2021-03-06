import React, { useState } from "react";
import { useContextConsumer } from "../../AppContext";
import SubmitModal from "./SubmitModal";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import RejectModal from "./RejectModal";
import ApproveModal from "./ApproveModal";
import useToasts from "../../hooks/useToasts";
import useBatchHeadersAndLines from "../../hooks/useBatchHeadersAndLines";
import { getBatchBody } from "../../utils/getBatchBody";

export default function ButtonGroup({ status, remarks, id, linesData }) {
  const { isManager, setIsAppLoading, isMyTimeEntriesSelected } =
    useContextConsumer();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const history = useHistory();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const { successToast, errorToast } = useToasts();

  const [selectedButton, setSelectedButton] = useState(null);

  const { mutate: mutateBatchHeadersAndLines } = useMutation(
    useBatchHeadersAndLines,
    {
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
    }
  );

  const handleSubmit = ({ status, remarks }) => {
    mutateBatchHeadersAndLines({
      requests: getBatchBody({ id, linesData, status, remarks }),
    });
  };

  const _renderSubmit = () => (
    <div className="self-end">
      <SubmitModal
        id={id}
        isOpen={isSubmitModalOpen}
        close={() => setIsSubmitModalOpen(false)}
        onSubmit={handleSubmit}
      />
      <button
        className="btn btn-primary"
        onClick={() => {
          setIsSubmitModalOpen(true);
          setSelectedButton("Submit");
        }}
      >
        {remarks ? "Resubmit" : "Submit"} for a week
      </button>
    </div>
  );

  if (status === "Open" && !isManager) {
    return _renderSubmit();
  }

  if (status === "Open" && isMyTimeEntriesSelected) {
    return _renderSubmit();
  }

  if (
    isManager &&
    status !== "Released" &&
    isMyTimeEntriesSelected === false &&
    !remarks
  ) {
    return (
      <div className="flex items-center space-x-2 self-end">
        <RejectModal
          isOpen={isRejectModalOpen}
          close={() => setIsRejectModalOpen(false)}
          onSubmit={handleSubmit}
        />
        <ApproveModal
          isOpen={isApproveModalOpen}
          close={() => setIsApproveModalOpen(false)}
          onSubmit={handleSubmit}
        />
        <button
          className="btn btn-outline"
          onClick={() => {
            setIsRejectModalOpen(true);
            setSelectedButton("Reject");
          }}
        >
          Reject
        </button>
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
