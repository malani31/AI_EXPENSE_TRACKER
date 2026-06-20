import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import API from '../../api/axios';

export const setBudget= createAsyncThunk("budget/setBudget",
    async (data,{rejectedWithValue})=>{
        try {
            const res = await API.post("budgets/set",data);
            return res.data.budget
        } catch (error) {
            return rejectedWithValue(error.response?.data?.message || "error setting budget")
        }
    }
)
export const getBudget = createAsyncThunk("budget/getBudget",
    async({usreId,month,year},{rejectedWithValue})=>{
        try {
            const res = await API.get(`/budgets/${usreId}/${month}/${year}`);
            return res.data;
        } catch (error) {
            return rejectedWithValue(error.response?.data?.message || "error getting budget")
        }
    }
)

export const updateBudget = createAsyncThunk("budget/updateBudget",
    async({id,budget},{rejectedWithValue})=>{
        try {
            const res = await API.put(`/budgets/update/${id}`,budget);
            return res.data.budget;
        } catch (error) {
            return rejectedWithValue(error.response?.data?.message || "error updating budget")
        }
    }
)

export const deleteBudget = createAsyncThunk("budget/deleteBudget",
    async({id,},{rejectedWithValue})=>{
        try {
            const res = await API.delete(`/budgets/${id}`,);
            return res.data.budget;
        } catch (error) {
            return rejectedWithValue(error.response?.data?.message || "error deleting budget")
        }
    }
)

const budgetSlice = createSlice({
    name:"budget",
    initialState:{
        budget:null,loading:false,error:null,
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(setBudget.pending,(state)=>{
            state.loading = true;
        })
        .addCase(setBudget.fulfilled,(state,action)=>{
            state.loading = false;
            state.budget = action.payload;
        })
        .addCase(setBudget.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error
        })
        .addCase(getBudget.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getBudget.fulfilled,(state,action)=>{
            state.loading = false;
            state.budget = action.payload;
        })
        .addCase(getBudget.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error
        })
        .addCase(updateBudget.fulfilled,(state,action)=>{
            state.budget = action.payload;
        })
        .addCase(deleteBudget.fulfilled,(state)=>{

            state.budget = null;
        })

    }
})

export default budgetSlice.reducer;