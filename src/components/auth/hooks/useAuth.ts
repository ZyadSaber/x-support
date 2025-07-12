import { useContext } from "react";
import { JWTPayload } from "@/lib/auth";
import { AuthProviderContext } from "../constants";

interface UseAuthReturn extends JWTPayload {
  disableLogin: boolean;
  refetch: () => void;
}

const useAuthProvider = (): UseAuthReturn =>
  useContext(AuthProviderContext) as UseAuthReturn;

export default useAuthProvider;
