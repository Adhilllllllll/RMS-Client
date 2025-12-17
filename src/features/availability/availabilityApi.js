import api from "../../api/axios";


export const getMyAvailability=()=>{
  api.get("/reviewer/availability/me");
}