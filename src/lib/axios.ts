import axios from "axios";
import { ACCESS_TOKEN_AUTH, BASE_URL } from "@/constants/config";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN_AUTH}`,
  },
});
