import apiUrl from "./apiUrl";
import axios from "axios";
import { getAuthToken } from "./storage";

export const getAllUser = async() => {
   const token = getAuthToken()
   const res = await axios.get(`${apiUrl}/user`,{
      headers:{
         Authorization:token
      }
   })
   return res
}

export const getUserById = async(id) => {
   const token = getAuthToken()
   const res = await axios.get(`${apiUrl}/user/${id}`,{
      headers:{
         Authorization:token
      }
   })
   return res
}
export const createUser = async(data) => {
   const token = getAuthToken();
   const res = await axios.post(`${apiUrl}/register`,data,{
      headers:{
         Authorization:token
      }
   })
   return res;
}