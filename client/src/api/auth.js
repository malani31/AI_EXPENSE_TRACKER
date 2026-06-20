import API from "./axios.js";

export const signup= (userData)=>{
    return API.post("auth/register",userData);
}

export const login = (credentials) => {
    return API.post("auth/login",credentials);
}

export const getProfile = () => {
    return API.get("user/me");
}
