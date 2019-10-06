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