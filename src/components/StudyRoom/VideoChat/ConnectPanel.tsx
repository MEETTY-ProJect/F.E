import React from "react";

interface ConnectPanelProps {
  onConnect: () => void;
  isMicOn: boolean;
  isCamOn: boolean;
  toggleMic: () => void;
  toggleCam: () => void;
  videoDevices: MediaDeviceInfo[];
  selectedDeviceId: string | null;
  changeCamera: (deviceId: string) => void;
}

const ConnectPanel = ({
  onConnect,
  isMicOn,
  isCamOn,
  toggleMic,
  toggleCam,
  videoDevices,
  selectedDeviceId,
  changeCamera,
}: ConnectPanelProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <button onClick={onConnect}>🔌 연결하기</button>
      <div>
        <button onClick={toggleMic}>
          {isMicOn ? "🔊 마이크 끄기" : "🔇 마이크 켜기"}
        </button>
        <button onClick={toggleCam}>
          {isCamOn ? "📷 카메라 끄기" : "🚫 카메라 켜기"}
        </button>
      </div>
      <div>
        <label>
          카메라 선택:{" "}
          <select
            value={selectedDeviceId ?? ""}
            onChange={(e) => changeCamera(e.target.value)}
          >
            {videoDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `카메라 (${device.deviceId.slice(0, 5)}...)`}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default ConnectPanel;
