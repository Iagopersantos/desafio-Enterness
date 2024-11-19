import { useState } from "react";
import Chat from "./pages/Chat/Chat";
import Join from "./pages/Join/Join";
import "./App.css";
import { Socket } from "socket.io-client";

function App() {
  const [chatVisibility, setChatVisibility] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null); // Tipo ajustado

  return (
    <>
      {chatVisibility ? (
        socket && <Chat socket={socket} /> // Certifique-se de que o socket existe antes de renderizar o Chat
      ) : (
        <Join setSocket={setSocket} setChatVisibility={setChatVisibility} />
      )}
    </>
  );
}

export default App;
