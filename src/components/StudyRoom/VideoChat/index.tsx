import React, { useRef, useState } from "react";
import ConnectPanel from "./ConnectPanel";
import VideoGrid from "./VideoGrid";
import useMediaSoup from "../../../hooks/useMediaSoup";

interface Props {
  roomId: string;
  userId: string;
  token: string;
}

const VideoChat = ({ roomId, userId, token }: Props) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);

  console.log("화상채팅 정보: ", roomId, "+", userId);

  const { connect, remoteStreams } = useMediaSoup({
    roomId,
    userId,
    accessJwt: token,
    localVideoRef,
  });

  return (
    <div style={{ padding: "16px" }}>
      <ConnectPanel onConnect={connect} />
      <VideoGrid localVideoRef={localVideoRef} remoteStreams={remoteStreams} />
    </div>
  );
};

export default VideoChat;
