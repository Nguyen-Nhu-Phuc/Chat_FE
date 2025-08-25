import { io } from "socket.io-client";

const socket = io("https://chat-nz39.onrender.com", {
    transports: ["websocket"],
    withCredentials: true
});

export default socket;
