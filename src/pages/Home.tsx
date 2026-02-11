import { useWebSocket } from "../hooks/websocket";

export default function HomePage() {
  const { disconnect } = useWebSocket("ws://localhost:5000/ws");

  return (
    <div>
      <button
        onClick={() => {
          disconnect();
        }}
      >
        {" "}
        close
      </button>
    </div>
  );
}
