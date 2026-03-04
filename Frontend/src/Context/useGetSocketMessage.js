import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../Zustand/useConversation.js";
import sound from "../assets/iphone.mp3";
function useGetSocketMessage() {
  const { socket } = useSocketContext();
  const { messages, setMessage } = useConversation();

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      setMessage([...messages, newMessage]);
    });
  }, [socket, messages, setMessage]);
}

export default useGetSocketMessage;
