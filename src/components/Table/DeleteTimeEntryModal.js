import React from "react";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
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
    <ConfirmModal
      isOpen={isOpen}
      close={close}
      title="Are you sure you want to delete?"
      btnText="Delete"
      onClickBtn={handleDelete}
    />
  );
}
