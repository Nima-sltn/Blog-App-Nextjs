"use client";

import { getUserApi, signinApi, signupApi } from "@/services/authService";
import { SigninInput, SignupInput } from "@/types/api";
import { User } from "@/types/common";
import { getApiErrorMessage } from "@/utils/apiError";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useMemo,
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
  signin: (values: SigninInput) => Promise<void>;
  signup: (values: SignupInput) => Promise<void>;
  getUser: () => Promise<void>;
}

interface AuthProviderProps {
  readonly children: ReactNode;
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
        ...state,
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

  const signin = useCallback(
    async (values: SigninInput) => {
      dispatch({ type: "loading" });

      try {
        const { message, user } = await signinApi(values);
        dispatch({ type: "signin", payload: user });
        toast.success(message);
        router.push("/profile");
        router.refresh();
      } catch (err: unknown) {
        const error = getApiErrorMessage(err);
        dispatch({ type: "rejected", payload: error });
        toast.error(error);
      }
    },
    [router],
  );

  const signup = useCallback(
    async (values: SignupInput) => {
      dispatch({ type: "loading" });

      try {
        const { message, user } = await signupApi(values);
        dispatch({ type: "signup", payload: user });
        toast.success(message);
        router.push("/profile");
        router.refresh();
      } catch (err: unknown) {
        const error = getApiErrorMessage(err);
        dispatch({ type: "rejected", payload: error });
        toast.error(error);
      }
    },
    [router],
  );

  const getUser = useCallback(async () => {
    dispatch({ type: "loading" });

    try {
      const { user } = await getUserApi();
      dispatch({ type: "user/loaded", payload: user });
    } catch (err: unknown) {
      dispatch({ type: "rejected", payload: getApiErrorMessage(err) });
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      signin,
      signup,
      getUser,
    }),
    [user, isAuthenticated, isLoading, signin, signup, getUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// --------- Hook ---------
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Auth context not found");
  return context;
}
