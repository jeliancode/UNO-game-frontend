import { useEffect, useState } from "react";

const useWebSocket = (url) => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("Conectado al WebSocket");
      setWs(socket);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Mensaje recibido:", data);
      setMessages((prev) => [...prev, data]);
    };

    socket.onclose = () => console.log("WebSocket cerrado");
    socket.onerror = (error) => console.error("Error en WebSocket:", error);

    return () => socket.close();
  }, [url]);

  const sendMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket no está conectado.");
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;
