import api from "../../api/axios";

export const fetchAdminCounts = () =>
  api.get("/admin/dashboard-counts");
