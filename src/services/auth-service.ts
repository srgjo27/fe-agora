// Auth service untuk authentication
import { API_ENDPOINTS } from "@/constants";
import { apiClient } from "@/services";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserResponse,
} from "@/types";

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const endpoint = API_ENDPOINTS.AUTH.LOGIN;
    const response = await apiClient.post<LoginResponse>(endpoint, credentials);

    if (response.data.access_token) {
      apiClient.setAuthToken(response.data.access_token);
    }

    return response.data;
  }

  async register(userData: RegisterRequest): Promise<UserResponse> {
    const endpoint = API_ENDPOINTS.AUTH.REGISTER;
    const response = await apiClient.post<UserResponse>(endpoint, userData);

    return response.data;
  }

  async logout(): Promise<void> {
    try {
      const endpoint = API_ENDPOINTS.AUTH.LOGOUT;
      await apiClient.post(endpoint);
    } finally {
      this.removeAuthToken();
    }
  }

  async refreshToken(): Promise<LoginResponse> {
    const endpoint = API_ENDPOINTS.AUTH.REFRESH;
    const response = await apiClient.post<LoginResponse>(endpoint);

    if (response.data.access_token) {
      apiClient.setAuthToken(response.data.access_token);
    }

    return response.data;
  }

  async getMyProfile(): Promise<UserResponse> {
    const endpoint = API_ENDPOINTS.USERS.ME;
    const response = await apiClient.get<UserResponse>(endpoint);

    return response.data;
  }

  async autoRefreshToken(currentToken?: string): Promise<void> {
    try {
      const token = currentToken || this.getStoredToken();
      if (!token) return;

      const payload = this.parseJWTPayload(token);
      if (!payload || !payload.exp) return;

      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = payload.exp - currentTime;

      if (timeUntilExpiry <= 300) {
        await this.refreshToken();
      }
    } catch (error) {
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
  getUserFromToken(
    currentToken?: string
  ): { userID: string; role: string } | null {
    const token = currentToken || this.getStoredToken();
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

  private removeAuthToken() {
    apiClient.clearAuthToken();
  }

  // Get stored token - dapat menerima token dari parameter atau dari persist
  private getStoredToken(): string | null {
    if (typeof window === "undefined") {
      return null;
    }

    // Coba ambil dari persist:auth di localStorage
    try {
      const persistedAuth = localStorage.getItem("persist:auth");
      if (persistedAuth) {
        const authData = JSON.parse(persistedAuth);
        const token = JSON.parse(authData.token);
        return token;
      }
    } catch (_) {}

    return null;
  }

  // Check if user is authenticated
  isAuthenticated(currentToken?: string): boolean {
    const token = currentToken || this.getStoredToken();
    if (!token) return false;

    const payload = this.parseJWTPayload(token);
    if (!payload || !payload.exp) return false;

    const currentTime = Math.floor(Date.now() / 1000);

    return payload.exp > currentTime;
  }

  // Initialize auth state from storage dan setup auto refresh
  initializeAuth(token?: string): void {
    // Only initialize in browser environment
    if (typeof window === "undefined") {
      return;
    }

    const authToken = token || this.getStoredToken();

    if (authToken && this.isAuthenticated(authToken)) {
      apiClient.setAuthToken(authToken);
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
