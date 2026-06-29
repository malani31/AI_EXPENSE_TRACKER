import API from "../../api/axios";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNotifications= createAsyncThunk(
    "notifications/fetch",
    async (userId)=>{
        const res =await  API.get(`notifications/${userId}`);
        res.data;
    }
);
export const markNotificationRead = createAsyncThunk(
    "notification/markRead",
    async(id)=>{
        await API.put(`/notifications/mark-read/${id}`) 
    }
);
export const clearNotifications= createAsyncThunk(
    "notifications/clear",
    async(userId)=>{
        await API.delete(`notifications/clear/${userId}`);
        return userId;
    }
);

const notificationSlice = createSlice({
    name:"notification",
    initialState:{
        list:[],
        unreadCount:0,
        loading:false,
    },
    reducers:{
        addNotification:(state,action)=>{
            state.list.unshift(action.payload);
            state.unreadCount +=1;
        },
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchNotifications.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchNotifications.fulfilled, (state, action) => {
            console.log("notificationsSlice:",action.payload);
            state.list = action.payload;
            state.unreadCount = (action.payload || []).filter((n) => !n.isRead).length ;
            state.loading = false;
        })
        .addCase(markNotificationRead.fulfilled,(state,action)=>{
            const id = action.payload;
            const notif = state.list.find((n)=> n._id ===id);
            if( notif && !notif.isRead){
                notif.isRead =true;
                state.unreadCount -=1;
            }
        })
        .addCase(clearNotifications.fulfilled, (state) => {
            state.list = [];
            state.unreadCount = 0;
          });
    }
})
export const {addNotification}=notificationSlice.actions;
export default notificationSlice.reducer;