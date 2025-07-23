// components/MyInfo/PasswordSection/index.tsx
import React, { useState } from "react";
import PasswordVerifier from "./PasswordVerifier";
import NewPasswordInputs from "./NewPasswordInputs";

interface PasswordSectionProps {
  onPasswordChange: (newPassword: string) => void;
}

const PasswordSection: React.FC<PasswordSectionProps> = ({
  onPasswordChange,
}) => {
  const [verified, setVerified] = useState(false);

  return (
    <div>
      <PasswordVerifier
        onSuccess={() => setVerified(true)}
        disabled={verified}
      />
      {verified && <NewPasswordInputs onChange={onPasswordChange} />}
    </div>
  );
};

export default PasswordSection;
