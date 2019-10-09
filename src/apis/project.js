import apiUrl from "./apiUrl";
import axios from "axios";
import { getAuthToken } from "./storage";

export const getALlProject = async() => {
   const token = getAuthToken();
   let res = await axios.get(`${apiUrl}/project`,{
      headers:{
         Authorization:token
      }
   })
   return res;
}

export const addProject = async data =>{
   const token = getAuthToken();
   console.log("Inside API Call")
   console.log(data);
   let res = await axios.post(`${apiUrl}/project`, data,{
      headers:{
         Authorization:token,
         'Content-Type':"application/x-www-form-urlencoded"
      }
   });
   return res;
}

export const updateProject = async (id,data) =>{
   const token = getAuthToken();
   let res = await axios.put(`${apiUrl}/project/${id}`,data,{
      headers:{
         Authorization:token,
         'Content-Type':"application/x-www-form-urlencoded"
      }
   });
   return res;
}