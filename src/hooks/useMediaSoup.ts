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

  const peerRef = useRef<any>(null);
  const deviceRef = useRef<any>(null);
  const sendTransportRef = useRef<any>(null);
  const recvTransportRef = useRef<any>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const connect = async () => {
    console.log("[MediaSoup] connect() 실행");

    try {
      // 1. protoo WebSocket 연결
      const SFU_WS_URL = `ws://34.22.72.174:4443/?roomId=${roomId}&peerId=${userId}&consume=true&token=${accessJwt}`;
      const transport = new protooClient.WebSocketTransport(SFU_WS_URL);
      const peer = new protooClient.Peer(transport);
      peerRef.current = peer;

      // 2. 이벤트 핸들링
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
        const device = new mediasoupClient.Device();
        deviceRef.current = device;

        const routerRtpCapabilities = await peer.request(
          "getRouterRtpCapabilities"
        );
        await device.load({ routerRtpCapabilities });

        // 3. sendTransport
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

        // 4. recvTransport
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

        // 5. join
        await peer.request("join", {
          id: userId,
          displayName: `User ${userId}`,
          device: { flag: "browser" },
          rtpCapabilities: device.rtpCapabilities,
        });

        // 6. getUserMedia
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
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

  // 🔴 언마운트 시 자원 정리
  useEffect(() => {
    return () => {
      console.log("[MediaSoup] 컴포넌트 언마운트 - 연결 해제 중");

      // 1. local stream 정리
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
        console.log("🛑 localStream 트랙 중지");
      }

      // 2. transport 정리
      sendTransportRef.current?.close?.();
      recvTransportRef.current?.close?.();
      console.log("📡 transport 종료");

      // 3. peer 연결 해제
      peerRef.current?.close?.();
      console.log("🔌 peer 연결 종료");

      // 4. videoRef도 해제
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
    };
  }, []);

  return {
    connect,
    remoteStreams,
  };
};

export default useMediaSoup;
