import React from "react";
import BaseConfirmModal from "../../common/BaseConfirmModal";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const WithdrawalConfirmModal = ({ onConfirm, onCancel }: Props) => {
  return (
    <BaseConfirmModal onConfirm={onConfirm} onCancel={onCancel}>
      <p>정말 탈퇴하시겠습니까?</p>
    </BaseConfirmModal>
  );
};

export default WithdrawalConfirmModal;
