import apiUrl from "./apiUrl"
import axios from "axios"
import { getAuthToken } from "./storage"

export const getAllTeams = async() => {
   const token = getAuthToken();
   let res = await axios.get(`${apiUrl}/team`,{
      headers:{
         Authorization:token
      }
   })
   return res;
}