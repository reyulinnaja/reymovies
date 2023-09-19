import {
  deleteSessionId,
  getAccountDetails,
  getRequestToken,
  postSessionId,
} from "@/services/AuthServices";
import type { NavbarStore } from "@/hooks/useNavbarStore";

export const getRequestTokenUseCase = async () => {
  const response = await getRequestToken();
  return response.data;
};

export const postSessionIdUseCase = async () => {
  if (localStorage.getItem("session_id")) return;

  try {
    const response = await postSessionId();

    localStorage.setItem("session_id", response.data.session_id);
    return response.data;
  } catch (error) {
    localStorage.removeItem("request_token");
    localStorage.removeItem("session_id");
  }
};

export const getAccountDetailsUseCase = async (
  setUserId: NavbarStore["setUserId"],
) => {
  const response = await getAccountDetails();
  setUserId(response.data.id);
  return response.data;
};

export const deleteSessionIdUseCase = async () => {
  const response = await deleteSessionId();
  return response.data;
};
