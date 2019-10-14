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


export const getTeam = async(id) => {
   const token = getAuthToken();
   let res = await axios.get(`${apiUrl}/team/${id}`,{
      headers:{
         Authorization:token
      }
   })
   return res;
}


export const addTeam = async (data) => {
   const token = getAuthToken();
   let res = await axios.post(`${apiUrl}/team`,data,{
      headers:{
         Authorization:token,
         'Content-Type':"application/x-www-form-urlencoded"
      }
   })
   return res;
}

export const updateTeam = async (id,data) => {
   const token = getAuthToken();
   let res = await axios.put(`${apiUrl}/team/${id}`,data,{
      headers:{
         Authorization:token,
         'Content-Type':"application/x-www-form-urlencoded"
      }
   })
   return res;
}