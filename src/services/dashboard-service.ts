import { UserResponse } from "@/types";
import { apiClient } from "@/services";
import { API_ENDPOINTS } from "@/constants";

class DashboardService {
  async getUsers(): Promise<UserResponse[]> {
    const response = await apiClient.get<UserResponse[]>(
      API_ENDPOINTS.ADMIN.GET_USERS
    );

    return response.data;
  }
}

export const dashboardService = new DashboardService();
