import { createContext } from "react";
import { AuthProviderState } from "./interface";
import { JWTPayload } from "@/lib/auth";

export const initialState: JWTPayload = {
  id: undefined,
  user_name: "",
  name: "",
  last_login_time: "",
  user_role: "",
};

export const AuthProviderContext =
  createContext<AuthProviderState>(initialState);
