import React from "react";
import BaseConfirmModal from "../../common/BaseConfirmModal";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const ResetConfirmModal = ({ onConfirm, onCancel }: Props) => {
  return (
    <BaseConfirmModal onConfirm={onConfirm} onCancel={onCancel}>
      <p>모든 정보를 초기화하시겠습니까?</p>
    </BaseConfirmModal>
  );
};

export default ResetConfirmModal;
