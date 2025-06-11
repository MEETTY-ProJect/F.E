import React, { useEffect } from 'react';
import './KakaoLoginButton.css';

declare global {
  interface Window {
    Kakao: any;
  }
}

function KakaoLoginButton() {
  useEffect(() => {
    // 카카오 SDK 초기화 (키는 카카오 개발자센터 REST API 키)
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('YOUR_KAKAO_REST_API_KEY');
    }
  }, []);

  const handleLogin = () => {
    if (!window.Kakao) {
      alert('카카오 SDK가 로드되지 않았습니다.');
      return;
    }
    if (!window.Kakao.isInitialized()) {
      alert('카카오 SDK가 초기화되지 않았습니다.');
      return;
    }

    window.Kakao.Auth.login({
      success(authObj: any) {
        console.log('로그인 성공', authObj);

        // 예: 받은 토큰(authObj.access_token)을 백엔드로 보내서 인증 처리 요청
        // fetch('/api/auth/kakao', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ accessToken: authObj.access_token }),
        // });

      },
      fail(err: any) {
        console.error('로그인 실패', err);
      },
    });
  };

  return (
    <button className="kakao-login-button" onClick={handleLogin}>
      <img
        src="/kakao_login.png"
        alt="Kakao symbol"
        className="kakao-login-icon"
      />
    </button>
  );
}

export default KakaoLoginButton;
