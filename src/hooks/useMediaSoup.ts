import { useState, useRef, useEffect } from "react";
import * as mediasoupClient from "mediasoup-client";
import * as protooClient from "protoo-client";

interface Props {
  roomId: string;
  userId: string;
  accessJwt: string;
  localVideoRef: React.RefObject<HTMLVideoElement | null>;
}

const BACKEND_API = "http://34.22.72.174:8080";

const useMediaSoup = ({ roomId, userId, accessJwt, localVideoRef }: Props) => {
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

  const peerRef = useRef<any>(null);
  const deviceRef = useRef<any>(null);
  const sendTransportRef = useRef<any>(null);
  const recvTransportRef = useRef<any>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  // ✅ 카메라/마이크 제어
  const toggleMic = () => {
    const audioTrack = localStreamRef.current?.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicOn(audioTrack.enabled);
    }
  };

  const toggleCam = () => {
    const videoTrack = localStreamRef.current?.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsCamOn(videoTrack.enabled);
    }
  };

  // ✅ 사용 가능한 비디오 장치 불러오기
  const getDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videos = devices.filter((d) => d.kind === "videoinput");
    setVideoDevices(videos);
    if (!selectedDeviceId && videos.length > 0) {
      setSelectedDeviceId(videos[0].deviceId);
    }
  };

  // ✅ 카메라 변경 함수
  const changeCamera = async (deviceId: string) => {
    setSelectedDeviceId(deviceId);

    // 기존 스트림 정리
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: { exact: deviceId } },
      audio: true,
    });
    localStreamRef.current = stream;

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }

    // 이미 연결되어 있다면 트랙 재전송
    if (sendTransportRef.current) {
      for (const track of stream.getTracks()) {
        await sendTransportRef.current.produce({ track });
      }
    }
  };

  const connect = async () => {
    console.log("[MediaSoup] connect() 실행");

    try {
      const SFU_WS_URL = `ws://34.22.72.174:4443/?roomId=${roomId}&peerId=${userId}&consume=true&token=${accessJwt}`;
      const transport = new protooClient.WebSocketTransport(SFU_WS_URL);
      const peer = new protooClient.Peer(transport);
      peerRef.current = peer;

      // 이벤트 처리
      peer.on("request", async (req: any, accept: any, reject: any) => {
        if (req.method === "newConsumer") {
          const data = req.data;
          if (!recvTransportRef.current) return;

          try {
            const consumer = await recvTransportRef.current.consume({
              id: data.id,
              producerId: data.producerId,
              kind: data.kind,
              rtpParameters: data.rtpParameters,
            });

            setRemoteStreams((prev) => {
              const existing = prev.find(
                (stream) => (stream as any).peerId === data.peerId
              );
              if (existing) {
                existing.addTrack(consumer.track);
                return [...prev];
              } else {
                const newStream = new MediaStream([consumer.track]);
                (newStream as any).peerId = data.peerId;
                return [...prev, newStream];
              }
            });

            accept();
          } catch (err) {
            console.error("[newConsumer] 실패:", err);
            reject();
          }
        } else {
          reject(404, "Not supported");
        }
      });

      peer.on("notification", ({ method, data }) => {
        console.log("📩 [notification]", method, data);
      });

      peer.on("open", async () => {
        await getDevices(); // 카메라 목록 불러오기

        const device = new mediasoupClient.Device();
        deviceRef.current = device;

        const routerRtpCapabilities = await peer.request(
          "getRouterRtpCapabilities"
        );
        await device.load({ routerRtpCapabilities });

        // Send transport
        const sendInfo = await peer.request("createWebRtcTransport", {
          producing: true,
          consuming: false,
        });
        const sendTransport = device.createSendTransport(sendInfo);
        sendTransportRef.current = sendTransport;

        sendTransport.on("connect", ({ dtlsParameters }, callback, errback) => {
          peer
            .request("connectWebRtcTransport", {
              transportId: sendInfo.id,
              dtlsParameters,
            })
            .then(callback)
            .catch(errback);
        });

        sendTransport.on(
          "produce",
          ({ kind, rtpParameters }, callback, errback) => {
            peer
              .request("produce", {
                transportId: sendInfo.id,
                kind,
                rtpParameters,
              })
              .then(({ id }) => callback({ id }))
              .catch(errback);
          }
        );

        // Recv transport
        const recvInfo = await peer.request("createWebRtcTransport", {
          producing: false,
          consuming: true,
        });
        const recvTransport = device.createRecvTransport(recvInfo);
        recvTransportRef.current = recvTransport;

        recvTransport.on("connect", ({ dtlsParameters }, callback, errback) => {
          peer
            .request("connectWebRtcTransport", {
              transportId: recvInfo.id,
              dtlsParameters,
            })
            .then(callback)
            .catch(errback);
        });

        // Join room
        await peer.request("join", {
          id: userId,
          displayName: `User ${userId}`,
          device: { flag: "browser" },
          rtpCapabilities: device.rtpCapabilities,
        });

        // getUserMedia (기본 카메라)
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: selectedDeviceId
            ? { deviceId: { exact: selectedDeviceId } }
            : true,
        });
        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        for (const track of stream.getTracks()) {
          await sendTransport.produce({ track });
        }

        console.log("✅ [MediaSoup] 연결 완료");
      });
    } catch (err) {
      console.error("[MediaSoup 연결 실패]", err);
    }
  };

  useEffect(() => {
    return () => {
      console.log("[MediaSoup] 컴포넌트 언마운트 - 연결 해제 중");

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
        console.log("🛑 localStream 트랙 중지");
      }

      sendTransportRef.current?.close?.();
      recvTransportRef.current?.close?.();
      peerRef.current?.close?.();

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
    };
  }, []);

  return {
    connect,
    remoteStreams,
    isMicOn,
    isCamOn,
    toggleMic,
    toggleCam,
    videoDevices,
    selectedDeviceId,
    changeCamera,
  };
};

export default useMediaSoup;
