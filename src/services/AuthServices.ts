import { axiosInstance } from "@/lib/axios";
import { getLocalSessionId, getLocalRequestToken } from "@/lib/utils";

export const getRequestToken = () => {
  return axiosInstance.get("/authentication/token/new");
};

export const postSessionId = () => {
  return axiosInstance.post("/authentication/session/new", {
    request_token: getLocalRequestToken(),
  });
};

export const getAccountDetails = () => {
  return axiosInstance.get("/account", {
    params: {
      session_id: getLocalSessionId(),
    },
  });
};

export const deleteSessionId = () => {
  return axiosInstance.delete("/authentication/session", {
    params: {
      session_id: getLocalSessionId(),
    },
  });
};
