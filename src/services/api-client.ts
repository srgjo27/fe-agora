import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { ApiResponse, ApiError } from "@/types";
import { API_BASE_URL, API_ENDPOINTS, HTTP_STATUS, ROUTES } from "@/constants";
import { LocalStorage, safeRedirect } from "@/utils";

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
      withCredentials: true, // Untuk mengirim cookies (refresh token)
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          const authState = LocalStorage.getItem<any>("persist:auth");
          const cleanToken = JSON.parse(authState.token);
          if (cleanToken) config.headers.Authorization = `Bearer ${cleanToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor untuk handle errors dan auto refresh
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        if (
          error.response?.status === HTTP_STATUS.UNAUTHORIZED &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            const refreshResponse = await this.axiosInstance.post(
              API_ENDPOINTS.AUTH.REFRESH
            );

            if (refreshResponse.data.access_token) {
              this.setAuthToken(refreshResponse.data.access_token);
              originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access_token}`;

              return this.axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            this.clearAuthToken();

            safeRedirect(ROUTES.AUTH.LOGIN);
          }
        }

        const errorMessage =
          (error.response?.data as any)?.error ||
          (error.response?.data as any)?.message ||
          error.message ||
          "";

        const apiError = new ApiError(
          errorMessage,
          error.response?.status || 0,
          error.response?.data
        );

        return Promise.reject(apiError);
      }
    );
  }

  // Set auth token untuk semua request
  setAuthToken(token: string): void {
    this.axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  }

  // Hapus auth token
  clearAuthToken(): void {
    delete this.axiosInstance.defaults.headers.common["Authorization"];
  }

  // Helper method untuk transform axios response
  private transformResponse<T>(response: AxiosResponse): ApiResponse<T> {
    return {
      status: response.status,
      message: response.data.message || "success",
      data: response.data,
    };
  }

  // HTTP Methods
  async get<T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(endpoint, { params });
      return this.transformResponse<T>(response);
    } catch (error) {
      throw error;
    }
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(endpoint, data);
      return this.transformResponse<T>(response);
    } catch (error) {
      throw error;
    }
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.put<T>(endpoint, data);
      return this.transformResponse<T>(response);
    } catch (error) {
      throw error;
    }
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.patch<T>(endpoint, data);
      return this.transformResponse<T>(response);
    } catch (error) {
      throw error;
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<T>(endpoint);
      return this.transformResponse<T>(response);
    } catch (error) {
      throw error;
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
