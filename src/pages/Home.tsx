import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const sendMessage = (payload: any) => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(typeof payload === "string" ? payload : JSON.stringify(payload));
    } else {
      console.warn("WebSocket is not open");
    }
  };
  const [wsStatus, setWsStatus] = useState<
    "connecting" | "open" | "closed" | "error"
  >("connecting");
  const wsRef = useRef<WebSocket | null>(null);
  const heartbeatRef = useRef<number | null>(null);

  useEffect(() => {
    const url = "ws://localhost:5000/ws"; // change to your websocket URL
    let shouldReconnect = true;
    let reconnectDelay = 1000;

    function connect() {
      setWsStatus("connecting");
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        setWsStatus("open");
        reconnectDelay = 1000;
        // ws.send("hello server");
        // start heartbeat
        if (heartbeatRef.current == null) {
          heartbeatRef.current = window.setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: "ping" }));
            }
          }, 30000);
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("ws message", data);
        } catch {
          console.log("ws raw", event.data);
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

    connect();

    return () => {
      shouldReconnect = false;
      if (heartbeatRef.current != null) {
        clearInterval(heartbeatRef.current);
        heartbeatRef.current = null;
      }
      wsRef.current?.close();
    };
  }, []);

  const closeWebSocket = () => {
    console.log(wsRef.current);
    wsRef.current?.close();
  };

  return (
    <div>
      <button
        onClick={() => {
          closeWebSocket();
        }}
      >
        {" "}
        close
      </button>
    </div>
  );
}
