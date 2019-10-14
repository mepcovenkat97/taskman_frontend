import apiUrl from "./apiUrl";
import axios from "axios";
import { getAuthToken } from "./storage";

export const getAllTask = async() => {
   const token = getAuthToken();
   let res = await axios.get(`${apiUrl}/task`,{
      headers:{
         Authorization:token
      }
   })
   return res;
}

export const getTaskById = async(id) => {
   const token = getAuthToken();
   let res = await axios.get(`${apiUrl}/task/${id}`,{
      headers:{
         Authorization:token
      }
   })
   return res;
}

export const addTask = async (data) => {
   const token = getAuthToken();
   let res = await axios.post(`${apiUrl}/task`,data,{
      headers:{
         Authorization:token,
         'Content-Type':"application/x-www-form-urlencoded"
      }
   })
   return res;
}

export const updateTaskStatus = async (id,data) => {
   const token = getAuthToken();
   let res = await axios.put(`${apiUrl}/task/${id}`,data,{
      headers:{
         Authorization:token,
         'Content-Type':"application/x-www-form-urlencoded"
      }
   })
}