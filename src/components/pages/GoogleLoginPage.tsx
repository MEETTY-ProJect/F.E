import React from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ 이렇게 변경

declare global {
  interface Window {
    google: any;
  }
}

const GoogleLoginPage: React.FC = () => {
  const handleGoogleLogin = () => {
    window.google.accounts.id.initialize({
      client_id: '455479613011-ri3ju46n6vl3pm8856bdj5emnohjt81a.apps.googleusercontent.com',
      callback: handleCredentialResponse,
      auto_select: false,
      use_fedcm_for_prompt: false,
    });
    window.google.accounts.id.prompt();
  };

  const handleCredentialResponse = (response: any) => {
    const decoded: any = jwtDecode(response.credential); // ✅ 타입 지정
    console.log('✅ 구글 사용자 정보:', decoded);

    // 여기에 백엔드에 보내는 코드도 추가 가능:
    // await fetch("http://your-server.com/api/auth/google", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ token: response.credential }),
    // });
  };

  return (
    <button onClick={handleGoogleLogin} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
      <img src="/google_login.png" alt="Google login" style={{ width: '100px', height: '25px' }} />
    </button>
  );
};

export default GoogleLoginPage;
