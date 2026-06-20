import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import budgetSlice from './slices/budgetSlice';
import dashboardSlice from './slices/dashboardSlice';
import notificationSettingsSlice from './slices/notificationSettingsSlice';
import notificationSlice from './slices/notificationSlice';
import profileSlice from './slices/profileSlice';
import reportSlice from './slices/reportSlice';
import  transactionSlice from './slices/transactionSlice';

const store = configureStore({
    reducer:{
        auth:authSlice,
        transactions:transactionSlice,
        dashboard:dashboardSlice,
        budget:budgetSlice,
        profile:profileSlice,
        report:reportSlice,
        notifications:notificationSlice,
        notificationSettings:notificationSettingsSlice,
    }
})

export default store;