import API from "./axios.js";

export const addTransactionAPI = (transactiondata) =>{
    return API.post("/transactions",transactiondata);
};

export const uploadReceiptAPI = (file) =>{
    const formData = new FormData();
    formData.append("receipt",file);
    return API.post("/transactions/upload-receipt",formData,{
        headers:{"Content-Type":"multipart/form-data"}
    });
};

export const getTransactionsAPI = () =>API.get("transactions");
export const deleteTransactionAPI= (id) => API.delete(`transactions/${id}`);
export const updateTransactionAPI= (id,updatedata) =>API.put(`transaction/${id}`,updatedata);