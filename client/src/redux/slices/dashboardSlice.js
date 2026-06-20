import API from "../../api/axios";
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

export const fetchDashboardSummary = createAsyncThunk(
    "dashboard/fetchsummary",
    async ({userId,month,year},{rejectWithValue})=>{
        try{
            const res = await API.get(`/report/summary/${userId}/${month}/${year}`);
            return res.data.dashboard;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || "Error loading summary")
        }
    }
)

const dashboardSlices = createSlice({

    name:"dashboard",
    initialState:{
        summary:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchDashboardSummary.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchDashboardSummary.fulfilled,(state,action)=>{
            state.loading = false;
            state.summary=action.payload;
        })
        .addCase(fetchDashboardSummary.rejected,(state,action)=>{
            state.loading = false;
            state.error=action.error;
        }) 
    }
})

export default dashboardSlices.reducer;