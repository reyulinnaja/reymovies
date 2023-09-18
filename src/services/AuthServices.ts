import { axiosInstance } from "@/lib/axios";

export const getRequestToken = () => {
  return axiosInstance.get("/authentication/token/new");
};

export const postSessionId = () => {
  return axiosInstance.post("/authentication/session/new", {
    request_token: localStorage.getItem("request_token"),
  });
};

export const getAccountDetails = () => {
  return axiosInstance.get("/account", {
    params: {
      session_id: localStorage.getItem("session_id"),
    },
  });
};

export const deleteSessionId = () => {
  return axiosInstance.delete("/authentication/session", {
    params: {
      session_id: localStorage.getItem("session_id"),
    },
  });
};
