import { API_ENDPOINTS } from "@/constants";
import { apiClient } from "@/services";
import {
  ThreadSummaryResponse,
  CategoryResponse,
  CategoryRequest,
  PaginatedResponse,
  ThreadDetailResponse,
  PostResponse,
  ThreadRequest,
} from "@/types";

export interface PaginationParams {
  page?: number;
  limit?: number;
}

class ForumService {
  async getCategories(): Promise<CategoryResponse[]> {
    const response = await apiClient.get<CategoryResponse[]>(
      API_ENDPOINTS.CATEGORIES
    );

    return response.data;
  }

  async createCategory(req: CategoryRequest): Promise<CategoryResponse> {
    const response = await apiClient.post<CategoryResponse>(
      API_ENDPOINTS.CATEGORIES,
      { ...req }
    );

    return response.data;
  }

  async getThreads(
    params?: PaginationParams
  ): Promise<PaginatedResponse<ThreadSummaryResponse>> {
    const response = await apiClient.get<
      PaginatedResponse<ThreadSummaryResponse>
    >(API_ENDPOINTS.FORUM.THREADS, params);

    return response.data;
  }

  async getThreadById(thread_id: string): Promise<ThreadDetailResponse> {
    const response = await apiClient.get<ThreadDetailResponse>(
      API_ENDPOINTS.FORUM.THREAD_DETAIL(thread_id)
    );

    return response.data;
  }

  async getPostsByThreadId(
    thread_id: string
  ): Promise<PaginatedResponse<PostResponse>> {
    const response = await apiClient.get<PaginatedResponse<PostResponse>>(
      API_ENDPOINTS.FORUM.POSTS(thread_id)
    );

    return response.data;
  }

  async createThread(data: ThreadRequest): Promise<ThreadDetailResponse> {
    const response = await apiClient.post<ThreadDetailResponse>(
      API_ENDPOINTS.FORUM.THREAD_CREATE,
      { ...data }
    );

    return response.data;
  }

  async deleteThread(thread_id: string): Promise<string> {
    const response = await apiClient.delete<string>(
      API_ENDPOINTS.FORUM.THREAD_DETAIL(thread_id)
    );

    return response.message;
  }

  async updateThread(
    thread_id: string,
    title?: string,
    content?: string
  ): Promise<ThreadDetailResponse> {
    const response = await apiClient.patch<ThreadDetailResponse>(
      API_ENDPOINTS.FORUM.THREAD_UPDATE(thread_id),
      { title, content }
    );

    return response.data;
  }

  async createPost(
    thread_id: string,
    content: string,
    parent_post_id?: string
  ): Promise<PostResponse> {
    const response = await apiClient.post<PostResponse>(
      API_ENDPOINTS.FORUM.POST_CREATE(thread_id),
      { content, parent_post_id }
    );

    return response.data;
  }

  async voteOnThread(thread_id: string, vote_type: number): Promise<string> {
    const response = await apiClient.post<string>(
      API_ENDPOINTS.FORUM.VOTE_ON_THREAD(thread_id),
      vote_type
    );

    return response.message;
  }

  async voteOnPost(post_id: string, vote_type: number): Promise<string> {
    const response = await apiClient.post<string>(
      API_ENDPOINTS.FORUM.VOTE_ON_POST(post_id),
      vote_type
    );

    return response.message;
  }
}

export const forumService = new ForumService();
