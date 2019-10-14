import apiUrl from "./apiUrl"
import axios from "axios";

import { getAuthToken } from "./storage";

export const createMessage = async (data) => {
   const token = getAuthToken();
   const res = await axios.post(`${apiUrl}/message`,data,{
      headers:{
         Authorization:token,
         'Content-Type':"application/x-www-form-urlencoded"
      }
   })
   return res;
}

export const getMessageById = async (id) => {
   const token = getAuthToken();
   const res = await axios.get(`${apiUrl}/message/${id}`,{
      headers:{
         Authorization:token,
         'Content-Type':"application/x-www-form-urlencoded"
      }
   })
   return res;
}