import React from 'react';
import jwt_decode from 'jwt-decode';

declare global {
  interface Window {
    google: any;
  }
}

type GoogleIconButtonProps = {
  onClick?: () => void;
};

const GoogleLoginPage: React.FC<GoogleIconButtonProps> = ({ onClick }) => {
  const handleGoogleLogin = () => {
    window.google.accounts.id.initialize({
      client_id: 'YOUR_GOOGLE_CLIENT_ID', // 🔁 여기에 구글 클라이언트 ID 입력
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.prompt();
  };

  const handleCredentialResponse = async (response: any) => {
    const jwt_decode = (await import('jwt-decode')).default;
    // const decoded = jwt_decode(response.credential);
    // console.log('Google 사용자 정보:', decoded);
  };
  

  return (
    <button
      onClick={handleGoogleLogin}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
      }}
    >
      <img
        src="/google_login.png"
        alt="Google login"
        style={{ width: '100px', height: '25px' }}
      />
    </button>
  );
};

export default GoogleLoginPage;