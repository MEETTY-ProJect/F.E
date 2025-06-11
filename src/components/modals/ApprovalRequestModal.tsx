import React from 'react';

// 메인페이지 방생성 후 승인요청 받는 모달창
interface ApprovalRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    room: {
      id: number;
      title: string;
      image: string;
      maxPeople: string;
      purpose: string;
      region: string;
      description: string;
    } | null;
  }
  
  function ApprovalRequestModal({ isOpen, onClose, room }: ApprovalRequestModalProps) {
    if (!isOpen || !room) return null;
  
    const handleApprove = async () => {
      if (!room) return;

      try {
        const response = await fetch(`http://34.64.218.29:8080/api/v1/board/${room.id}/join`, {
          method: "POST",
          headers: {
            // accept 헤더는 백엔드가 요구할 경우 포함
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // accessToken 오타 확인 필요!
          },
          // 빈 body 전송
          body: "", 
        });
    
        const result = await response.json();
        console.log("승인요청 결과:", result);
    
        if (!response.ok || !result.isSuccess) {
          throw new Error(result.message || "승인 요청 실패");
        }
    
        alert(`"${room.title}" 방에 승인 요청을 보냈습니다.`);
        onClose();
      } catch (error: any) {
        alert(`오류 발생: ${error.message}`);
        console.error(error);
      }
    };
    
    return (
      <div className="approval-overlay" onClick={onClose}>
        <div className="approval-modal-content" onClick={(e) => e.stopPropagation()}>
          <div style={{ position: "relative", width: "450px", height: "150px" }}>
            <img src={room.image} alt={room.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }} />
            <p style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "white", fontWeight: "bold", textShadow: "0 0 5px rgba(0,0,0,0.7)" }}>
              {room.title}
            </p>
          </div>
  
          <div className="approval-text">
          <div className="approval-info">
            <div className="approval-numberofpeople">스터디 정원</div>
            <div className="value">{room.maxPeople}</div>
            </div>
          <div className="approval-info">
            <div className="approval-purpose">목적</div>
            <div className="value">{room.purpose}</div>
            </div>
          <div className="approval-info">
            <div className="approval-region">지역</div>
            <div className="value">{room.region}</div>
            </div>
          </div>
          <hr />
          <div className="approval-announcements">스터디 공지사항</div>
          <div className="approval-description">
          {room.description
            ? room.description.split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))
            : "공지사항이 없습니다."}
          </div>
  
          <div className="approval-buttons">
            <button className="approval-cancel-button"
            onClick={onClose}>취소</button>
            <button className="approval-approval-button"
            onClick={handleApprove}>승인 요청</button>
          </div>
        </div>
      </div>
    );
  }

export default ApprovalRequestModal;