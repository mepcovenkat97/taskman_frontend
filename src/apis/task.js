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