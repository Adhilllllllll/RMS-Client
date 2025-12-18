import api from "../../api/axios";


export const getMyAvailability=()=>{
  return api.get("/reviewer/availability/me");
}


export const createAvailability=(data)=>{
  return api.post("/reviewer/availability",data);
}

export const deleteAvailability =(id)=>{
  return api.delete(`/reviewer/availability/${id}`);
}