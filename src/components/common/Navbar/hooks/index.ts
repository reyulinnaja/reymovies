import {
  deleteSessionIdUseCase,
  getAccountDetailsUseCase,
  getRequestTokenUseCase,
  postSessionIdUseCase,
} from "@/useCases/AuthUseCases";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { NavbarStore } from "@/hooks/useNavbarStore";

const windows =
  global?.window && window.location.href.includes("approved=true");

export const useLoginMutation = () => {
  return useMutation(async () => getRequestTokenUseCase(), {
    onSuccess: (data) => {
      localStorage.setItem("request_token", data.request_token);
      window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=http://localhost:3000`;
    },
  });
};

export const usePostSessionIdQuery = () => {
  return useQuery({
    queryKey: ["session_id"],
    queryFn: async () => postSessionIdUseCase(),
    enabled: windows,
  });
};

export const useGetAccountDetailsQuery = (
  getLocalSessionId: any,
  setUserId: NavbarStore["setUserId"],
) => {
  return useQuery({
    queryKey: ["account_details"],
    queryFn: async () => getAccountDetailsUseCase(setUserId),
    enabled: getLocalSessionId,
  });
};

export const useLogoutMutation = () => {
  return useMutation(async () => deleteSessionIdUseCase(), {
    onSuccess: () => {
      localStorage.removeItem("request_token");
      localStorage.removeItem("session_id");
      window.location.reload();
    },
  });
};
