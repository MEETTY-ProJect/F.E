import React from "react";
import VideoChat from "./VideoChat";

interface Props {
  roomId: string;
  userId: string;
  token: string;
}

const MainContent = ({ roomId, userId, token }: Props) => {
  return (
    <div>
      <VideoChat roomId={roomId} userId={userId} token={token} />
    </div>
  );
};

export default MainContent;
