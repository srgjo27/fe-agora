import { API_ENDPOINTS } from "@/constants";
import { apiClient } from "@/services";
import {
  ThreadSummaryResponse,
  CategoryResponse,
  CategoryRequest,
  PaginatedResponse,
  ThreadDetailResponse,
} from "@/types";

export interface PaginationParams {
  page?: number;
  limit?: number;
}

class ForumService {
  async getCategories(): Promise<CategoryResponse[]> {
    const response = await apiClient.get<CategoryResponse[]>(
      API_ENDPOINTS.FORUM.CATEGORIES
    );

    return response.data;
  }

  async createCategory(req: CategoryRequest): Promise<CategoryResponse> {
    const response = await apiClient.post<CategoryResponse>(
      API_ENDPOINTS.FORUM.CATEGORIES,
      { ...req }
    );

    return response.data;
  }

  async getThreads(
    params?: PaginationParams
  ): Promise<PaginatedResponse<ThreadSummaryResponse>> {
    const response = await apiClient.get<
      PaginatedResponse<ThreadSummaryResponse>
    >(API_ENDPOINTS.FORUM.THREADS, { params });

    return response.data;
  }

  async getThreadById(threadId: string): Promise<ThreadDetailResponse> {
    const endpoint = API_ENDPOINTS.FORUM.THREAD_DETAIL(threadId);

    const response = await apiClient.get<ThreadDetailResponse>(endpoint);

    return response.data;
  }
}

export const forumService = new ForumService();
