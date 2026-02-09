import { io } from 'socket.io-client';

const env = import.meta.env;
const url = env.VITE_BACKEND_URL || 'http://localhost:8000';
const token=localStorage.getItem("token");
export const socket = io(url,{
    autoConnect: false,
        auth:{token}
});
