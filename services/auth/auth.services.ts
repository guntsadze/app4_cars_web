import { api } from "@/libs/api";
import { ACCOUNT_lOGIN } from "@/libs/constants/endpoints";
import Cookie from "js-cookie";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    username: string;
  };
  companyNotExists: boolean;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post(ACCOUNT_lOGIN, credentials);

    const token = response?.accessToken;

    console.log(token);

    if (token && typeof document !== "undefined") {
      Cookie.set("token", token);
    }

    return response;
  }

  logout() {
    Cookie.remove("token");
    window.location.href = "/login";
  }
}

export const authService = new AuthService();
