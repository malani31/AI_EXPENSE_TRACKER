import {io} from "socket.io-client";

let socket;

export const initSocket = (token)=>
{
    if(!socket){
        socket = io(import.meta.env.VITE_SERVER_URL, {
      withCredentials: true,
      auth: { token },
    });
    }

    return socket;
};

export const getSocket = ()=>socket;