"use client";

import { getUserApi, signinApi, signupApi } from "@/services/authService";
import { User } from "@/types/common";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import toast from "react-hot-toast";

// --------- Types ---------

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "loading" }
  | { type: "rejected"; payload: string }
  | { type: "signin"; payload: User }
  | { type: "signup"; payload: User }
  | { type: "user/loaded"; payload: User };

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signin: (values: Record<string, unknown>) => Promise<void>;
  signup: (values: Record<string, unknown>) => Promise<void>;
  getUser: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// --------- Initial State ---------
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// --------- Reducer ---------
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "signin":
    case "signup":
    case "user/loaded":
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    default:
      throw new Error("Unknown action!");
  }
}

// --------- Context ---------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --------- Provider ---------
export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [{ user, isAuthenticated, isLoading }, dispatch] = useReducer(
    authReducer,
    initialState,
  );

  async function signin(values: Record<string, unknown>) {
    dispatch({ type: "loading" });

    try {
      const { message, user } = await signinApi(values);
      dispatch({ type: "signin", payload: user });
      toast.success(message);
      router.push("/profile");
    } catch (err: any) {
      const error = err?.response?.data?.message || "Something went wrong";
      dispatch({ type: "rejected", payload: error });
      toast.error(error);
    }
  }

  async function signup(values: Record<string, unknown>) {
    dispatch({ type: "loading" });

    try {
      const { message, user } = await signupApi(values);
      dispatch({ type: "signup", payload: user });
      toast.success(message);
      router.push("/profile");
    } catch (err: any) {
      const error = err?.response?.data?.message || "Something went wrong";
      dispatch({ type: "rejected", payload: error });
      toast.error(error);
    }
  }

  async function getUser() {
    dispatch({ type: "loading" });

    try {
      const { user } = await getUserApi();
      dispatch({ type: "user/loaded", payload: user });
    } catch (err: any) {
      const error = err?.response?.data?.message || "Something went wrong";
      dispatch({ type: "rejected", payload: error });
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signin,
        signup,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// --------- Hook ---------
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Auth context not found");
  return context;
}
