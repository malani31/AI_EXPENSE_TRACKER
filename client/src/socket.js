import {io} from "socket.io-client";

let socket;

export const initSocket = (token)=>
{
    if(!socket){
        socket = io("http://localhost:8080/", {
      withCredentials: true,
      auth: { token },
    });
    }

    return socket;
};

export const getSocket = ()=>socket;