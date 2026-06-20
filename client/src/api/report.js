import API from "./axios.js";

export const fetchAiInsights =  async (userId,month,year)=>{
    const res= await API.get(`/report/ai-insights/${userId}/${month}/${year}`);
    return res.data.insights;
}