import React from "react";

interface Props {
  localVideoRef: React.RefObject<HTMLVideoElement | null>;
  remoteStreams: MediaStream[];
}

const VideoGrid = ({ localVideoRef, remoteStreams }: Props) => {
  return (
    <div>
      <h3>내 카메라</h3>
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        style={{ width: 300, height: 200, border: "1px solid black" }}
      />
      <h3>다른 참가자</h3>
      {remoteStreams.map((stream, idx) => (
        <video
          key={stream.id || idx}
          autoPlay
          playsInline
          style={{ width: 300, height: 200, border: "1px solid red" }}
          ref={(video) => {
            if (video) video.srcObject = stream;
          }}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
