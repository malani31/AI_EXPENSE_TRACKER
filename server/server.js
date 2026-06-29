import './config/env.js';
import express from 'express';
import cors from 'cors';
import {createServer} from 'http';
import {initSocket} from './utils/socket.js';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import budgetInsightsRoutes from './routes/budgetInsightsRoutes.js';
import budgetRoutes from './routes/budgetRoute.js';
import notificationRoutes from './routes/notificationRoutes.js';
import notificationSettingsRoutes from './routes/notificationSettingsRoutes.js';
import reportRoutes from './routes/reportRoute.js';
import transactionRoutes from './routes/transactionRoute.js';
import userRoutes from './routes/userRoutes.js';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(
    cors({
        origin:process.env.CLIENT_URL,
        credentials:true,
    })
);

app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/transactions',transactionRoutes);
app.use('/api/budgets',budgetRoutes);
app.use('/api/budget-insights', budgetInsightsRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/notifications',notificationRoutes);
app.use('/api/notification-settings',notificationSettingsRoutes);

app.get('/',(req,res)=>{
    res.send({message:"Hello from server!"});
})
app.get('/health',(req,res)=>{
    res.send({message:"server is now healthy"})
})

const port = process.env.PORT || 8001;
const server =  createServer(app);

const io = initSocket(server);

app.set('io',io)
server.listen(port,()=>{
    console.log(`Server started on port:${port}`);
})