import axios from "axios"

const api=axios.create({
    baseURL:"http://localhost:4000"
})


export const functionToSignup=async (data)=>{
    return await api.post("/user/register",data,{ withCredentials: true });
} 
export const functionToLogin=async (data)=>{
    return await api.post("/user/login",data,{withCredentials:true});
} 
export const functionToLogout=async ()=>{
    return await api.post("/user/logout",{withCredentials:true});
} 
export const functionToGetProfile=async ()=>{
    return await api.get("/user/getprofile",{withCredentials:true});
} 