import React from "react";
import { Modal } from "..";
import { useContextConsumer } from "../../AppContext";
import useDeleteLine from "../../hooks/useDeleteLine";
import { useMutation } from "react-query";
import useToasts from "../../hooks/useToasts";

export default function DeleteTimeEntryModal({
  isOpen,
  close,
  id,
  refetchLines,
}) {
  const { setIsAppLoading } = useContextConsumer();
  const { successToast, errorToast } = useToasts();

  const { mutate: mutateDeleteLine } = useMutation(useDeleteLine, {
    onSuccess: () => {
      setIsAppLoading(false);
      refetchLines();
      successToast("Deleted Successfully");
    },
    onError: () => {
      setIsAppLoading(false);
      errorToast("Sorry, Something went wrong.");
    },
  });

  const handleDelete = () => {
    setIsAppLoading(true);
    close();
    mutateDeleteLine(id);
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
