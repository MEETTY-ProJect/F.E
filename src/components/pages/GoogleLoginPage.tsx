import React from 'react';
import jwtDecode from 'jwt-decode'; // jwtDecode는 default export임

declare global {
  interface Window {
    google: any;
  }
}

type GoogleLoginPageProps = {
  onClick?: () => void;
};

const GoogleLoginPage: React.FC<GoogleLoginPageProps> = ({ onClick }) => {
  const handleCredentialResponse = (response: any) => {
    // const decoded = jwtDecode.default(token);
    // console.log('✅ 구글 사용자 정보:', decoded);
    // 백엔드 전송 등 추가 가능
  };

  const handleGoogleLogin = () => {
    window.google.accounts.id.initialize({
      client_id: '455479613011-ri3ju46n6vl3pm8856bdj5emnohjt81a.apps.googleusercontent.com',
      callback: handleCredentialResponse,
      auto_select: false,
      use_fedcm_for_prompt: false,
    });
    window.google.accounts.id.prompt();

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
    >
      <img src="/google_login.png" alt="Google login" style={{ width: '100px', height: '25px' }} />
    </button>
  );
};

export default GoogleLoginPage;