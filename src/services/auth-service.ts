// Auth service untuk authentication
import { API_ENDPOINTS } from "@/constants";
import { apiClient } from "@/services";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserResponse,
} from "@/types";
import { LocalStorage } from "@/utils";

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    if (response.data.access_token) {
      this.setAuthToken(response.data.access_token);
    }

    return response.data;
  }

  async register(userData: RegisterRequest): Promise<UserResponse> {
    const response = await apiClient.post<UserResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    );
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      this.removeAuthToken();
    }
  }

  async refreshToken(): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.REFRESH
    );

    if (response.data.access_token) {
      this.setAuthToken(response.data.access_token);
    }

    return response.data;
  }

  async getMyProfile(): Promise<UserResponse> {
    const response = await apiClient.get<UserResponse>(API_ENDPOINTS.USERS.ME);
    return response.data;
  }

  async autoRefreshToken(): Promise<void> {
    try {
      // const token = this.getStoredToken();
      const token = LocalStorage.getItem<string>("auth_token");
      if (!token) return;

      const payload = this.parseJWTPayload(token);
      if (!payload || !payload.exp) return;

      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = payload.exp - currentTime;

      if (timeUntilExpiry <= 300) {
        await this.refreshToken();
      }
    } catch (error) {
      console.error("Auto refresh token failed:", error);
      this.removeAuthToken();
    }
  }

  // Parse JWT payload untuk mendapatkan informasi expiry
  private parseJWTPayload(token: string): any {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  }

  // Get user info from stored token
  getUserFromToken(): { userID: string; role: string } | null {
    // const token = this.getStoredToken();
    const token = LocalStorage.getItem<string>("auth_token");
    if (!token) return null;

    const payload = this.parseJWTPayload(token);
    if (!payload) return null;

    return {
      userID: payload.user_id,
      role: payload.role,
    };
  }

  isAdmin(): boolean {
    const user = this.getUserFromToken();
    return user?.role === "admin";
  }

  isMember(): boolean {
    const user = this.getUserFromToken();
    return user?.role === "member";
  }

  // Helper methods
  private setAuthToken(token: string) {
    apiClient.setAuthToken(token);
    LocalStorage.setItem("auth_token", token);
  }

  private removeAuthToken() {
    apiClient.clearAuthToken();
    LocalStorage.removeItem("auth_token");
    LocalStorage.removeItem("user");
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    // const token = this.getStoredToken();
    const token = LocalStorage.getItem<string>("auth_token");
    if (!token) return false;

    const payload = this.parseJWTPayload(token);
    if (!payload || !payload.exp) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  }

  // getStoredToken(): string | null {
  //   if (typeof window === "undefined") {
  //     return null;
  //   }
  //   return localStorage.getItem("auth_token");
  // }

  // Initialize auth state from storage dan setup auto refresh
  initializeAuth(): void {
    // Only initialize in browser environment
    if (typeof window === "undefined") {
      return;
    }

    // const token = this.getStoredToken();
    const token = LocalStorage.getItem<string>("auth_token");
    if (token && this.isAuthenticated()) {
      apiClient.setAuthToken(token);
      this.setupAutoRefresh();
    } else {
      this.removeAuthToken();
    }
  }

  private setupAutoRefresh(): void {
    setInterval(() => {
      this.autoRefreshToken();
    }, 240000);
  }
}

export const authService = new AuthService();
export default authService;
