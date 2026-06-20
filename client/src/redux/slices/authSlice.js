import {createAsyncThunk,createSlice}from '@reduxjs/toolkit';
import {login,signup} from '../../api/auth';

const storedUser= localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")) :null;

const storedToken =  localStorage.getItem("token") || null;

const initialState = {
    user:storedUser,
    token:storedToken,
    loading:false,
    error:null,
}


export const signupUser= createAsyncThunk("auth/register",async(userdata,{rejectWithValue})=>{
    try {
        const {data}=await signup(userdata);
        localStorage.setItem("token",data.token);
        localStorage.setItem("user",JSON.stringify(data.user));

        return{ user:data.user,token:data.token}
    } catch (error) {
            return rejectWithValue(error.response.data.message);
    }
})

export const loginUser= createAsyncThunk("auth/login",async(credentials,{rejectWithValue})=>{
    try {
        const {data}=await login(credentials);
        localStorage.setItem("token",data.token);
        localStorage.setItem("user",JSON.stringify(data.user));

        return{ user:data.user,token:data.token}
    } catch (error) {
            return rejectWithValue(error.response.data.message);
    }
})

const authSlices= createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout: (state)=>{
            state.token=null;
            state.user=null;

            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },

    extraReducers: (builder)=>{
        builder
            .addCase(loginUser.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled,(state,action)=>{
                state.loading = false;
                state.user =  action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.error;
            })
            .addCase(signupUser.pending,(state)=>{
                state.loading =true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled,(state,action)=>{
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(signupUser.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.error
            })
    }
});

export const {logout} = authSlices.actions;
export default authSlices.reducer;

