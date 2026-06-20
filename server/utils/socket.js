import {Server} from 'socket.io';
// import { protectSocket } from "../middleware/authMiddleware.js";
let io;

export const initSocket= async (server)=>{
    io= new Server(server,{
        cors:{
            origin:"http://localhost:5173",
            methods:["GET","POST"],
            credentials:true
        }
    });
    //io.use(protectSocket)
    io.on("connection",(socket)=>{
        console.log("New Client connected",socket.id);
        socket.emit("welcome",{message:"weclome to finance tracket websocket!"});

        socket.on("register",(userId)=>{
            socket.join(userId);
            console.log(`User ${userId} joined room`);
        });

        socket.on("disconnect",()=>{
            console.log("Client disconncet",socket.id);
        });
    });
    return io;
}

export const getIO=()=> io;