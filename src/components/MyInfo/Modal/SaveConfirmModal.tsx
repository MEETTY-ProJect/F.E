import React from "react";
import BaseConfirmModal from "../../common/BaseConfirmModal";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const SaveConfirmModal = ({ onConfirm, onCancel }: Props) => {
  return (
    <BaseConfirmModal onConfirm={onConfirm} onCancel={onCancel}>
      <p>정말 수정하시겠습니까?</p>
    </BaseConfirmModal>
  );
};

export default SaveConfirmModal;
