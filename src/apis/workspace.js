import apiUrl from "./apiUrl";
import axios from "axios";
import { getAuthToken } from "./storage";


export const addWorkspace = async data =>{
   const token = getAuthToken();
   console.log("Inside API Call")
   console.log(data);
   let res = await axios.post(`${apiUrl}/workspace`, data,{
      headers:{
         Authorization:token,
         'Content-Type':"application/x-www-form-urlencoded"
      }
   });
   console.log(res)
   return res;
};

export const updateWorkspace = async (id,data) => {
   const token = getAuthToken();
   let res = await axios.put(`${apiUrl}/workspace/${id}`,data,{
      headers:{
         Authorization:token,
         'Content-type':"application/x-www-form-urlencoded"
      }
   })
   return res;
}

export const getAllWorkspace = async () => {
   const token = getAuthToken();
   let res = await axios.get(`${apiUrl}/workspace`,{
      headers:{
         Authorization:token,
         'Content-type':"application/x-www-form-urlencoded"
      }
   })
   return res;
}