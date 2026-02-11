import { useRef, useState } from "react";
import { UseAuth } from "./auth";
import type { WebSocketPayload } from "../types/websocket";

type WsStatus = "connecting" | "open" | "closed" | "error";

export function useWebSocket(baseUrl: string) {
  const { getAccessToken } = UseAuth();
  const [wsStatus, setWsStatus] = useState<WsStatus>("connecting");
  const [shouldReconnect, setShouldReconnect] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);
  const heartbeatRef = useRef<number | null>(null);

  let reconnectDelay = 1000;

  function connect(callback: (event: WebSocketPayload) => void) {
    setWsStatus("connecting");

    const token = getAccessToken();
    const url = new URL(baseUrl);
    url.searchParams.append("accessToken", token);

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setWsStatus("open");
      reconnectDelay = 1000;

      if (heartbeatRef.current == null) {
        // heartbeatRef.current = window.setInterval(() => {
        //   if (ws.readyState === WebSocket.OPEN) {
        //     ws.send(JSON.stringify({ type: "ping" }));
        //   }
        // }, 30000);
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("ws message", data);
        callback(data);
      } catch (error) {
        console.log("ws raw", error, event.data);
      }
    };

    ws.onclose = () => {
      setWsStatus("closed");

      if (heartbeatRef.current != null) {
        clearInterval(heartbeatRef.current);
        heartbeatRef.current = null;
      }

      if (shouldReconnect) {
        setTimeout(connect, reconnectDelay);
        reconnectDelay = Math.min(30000, reconnectDelay * 1.5);
      }
    };

    ws.onerror = (err) => {
      console.error("ws error", err);
      setWsStatus("error");
      ws.close();
    };
  }

  // useEffect(() => {
  //   connect();

  //   return () => {
  //     shouldReconnect = false;
  //     if (heartbeatRef.current != null) {
  //       clearInterval(heartbeatRef.current);
  //       heartbeatRef.current = null;
  //     }
  //     wsRef.current?.close();
  //   };
  // }, [baseUrl, getAccessToken]);

  // const sendMessage = (payload: unknown) => {
  //   const ws = wsRef.current;
  //   if (ws && ws.readyState === WebSocket.OPEN) {
  //     ws.send(typeof payload === "string" ? payload : JSON.stringify(payload));
  //   } else {
  //     console.warn("WebSocket is not open");
  //   }
  // };

  const disconnect = () => {
    setShouldReconnect(false);
    wsRef.current?.close();
  };

  return { wsStatus, connect, disconnect };
}
