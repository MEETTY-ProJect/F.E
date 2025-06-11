// 로그아웃 함수 별도의 파일로 분리

export const logout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
  
      if (accessToken) {
        await fetch("http://34.64.218.29:8080/api/auth/v1/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
  
      // 로컬 스토리지 클리어
      localStorage.removeItem("accessToken");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      localStorage.removeItem("address");
      localStorage.removeItem("profileImage");
      localStorage.removeItem("role");
  
      // 로그인 페이지로 이동
      window.location.href = "/login";
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 중 문제가 발생했습니다.");
    }
  };
  