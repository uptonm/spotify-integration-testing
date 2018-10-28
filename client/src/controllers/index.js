import axios from "axios";

export const fetchCurrentUser = async () => {
  const res = await axios.get("/api/current_user");
  return res;
};
