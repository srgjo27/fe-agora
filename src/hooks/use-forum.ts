import { forumService, PaginationParams } from "@/services";
import {
  ThreadSummaryResponse,
  ThreadDetailResponse,
  PaginationMeta,
  PostResponse,
  CategoryResponse,
} from "@/types";
import { useEffect, useState, useCallback } from "react";

interface UseThreadsReturn {
  threads: ThreadSummaryResponse[] | null;
  meta: PaginationMeta | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UseThreadByIdReturn {
  thread: ThreadDetailResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UsePostsByThreadIdReturn {
  posts: PostResponse[] | null;
  meta: PaginationMeta | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UseCreatePostReturn {
  createPost: (
    content: string,
    parent_post_id?: string
  ) => Promise<PostResponse | null>;
  isLoading: boolean;
  error: string | null;
}

interface UseCategoriesReturn {
  categories: CategoryResponse[] | null;
  isLoading: boolean;
  error: string | null;
}

interface UseDeleteThreadReturn {
  deleteThread: (thread_id: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

interface UseVoteThreadReturn {
  voteThread: (thread_id: string, vote_type: number) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

export function useThreads(params: PaginationParams): UseThreadsReturn {
  const [threads, setThreads] = useState<ThreadSummaryResponse[] | null>(null);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { page, limit } = params;

  const fetchThreads = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await forumService.getThreads({ page, limit });

      setThreads(response.data);
      setMeta(response.meta);
    } catch (error) {
      setError((error as Error)?.message || "Gagal mengambil data thread");
    } finally {
      setIsLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  return {
    threads,
    meta,
    isLoading,
    error,
    refetch: fetchThreads,
  };
}

export function useThreadById(thread_id: string): UseThreadByIdReturn {
  const [thread, setThread] = useState<ThreadDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchThread = useCallback(async () => {
    if (!thread_id) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await forumService.getThreadById(thread_id);
      setThread(response);
    } catch (error) {
      setError((error as Error)?.message || "Gagal mengambil detail thread");
    } finally {
      setIsLoading(false);
    }
  }, [thread_id]);

  useEffect(() => {
    fetchThread();
  }, [fetchThread]);

  return {
    thread,
    isLoading,
    error,
    refetch: fetchThread,
  };
}

export function usePostsByThreadId(
  thread_id: string
): UsePostsByThreadIdReturn {
  const [posts, setPosts] = useState<PostResponse[] | null>(null);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    if (!thread_id) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await forumService.getPostsByThreadId(thread_id);

      setPosts(response.data);
      setMeta(response.meta);
    } catch (error) {
      setError((error as Error)?.message || "Gagal mengambil data post");
    } finally {
      setIsLoading(false);
    }
  }, [thread_id]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    meta,
    isLoading,
    error,
    refetch: fetchPosts,
  };
}

export function useCreatePost(thread_id: string): UseCreatePostReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async (
    content: string,
    parent_post_id?: string
  ): Promise<PostResponse | null> => {
    if (!thread_id) {
      setError("Thread ID tidak valid.");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await forumService.createPost(
        thread_id,
        content,
        parent_post_id
      );

      return response;
    } catch (error) {
      setError((error as Error)?.message || "Gagal membuat balasan publik");

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPost,
    isLoading,
    error,
  };
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<CategoryResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await forumService.getCategories();
        setCategories(response);
      } catch (error) {
        setError((error as Error)?.message || "Gagal mengambil data kategori");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return {
    categories,
    isLoading,
    error,
  };
}

export function useDeleteThread(): UseDeleteThreadReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteThread = async (thread_id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await forumService.deleteThread(thread_id);
      return true;
    } catch (error) {
      setError((error as Error)?.message || "Gagal menghapus thread");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteThread,
    isLoading,
    error,
  };
}

export function useVoteThread(): UseVoteThreadReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const voteThread = async (
    thread_id: string,
    vote_type: number
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await forumService.voteOnThread(thread_id, vote_type);
      return true;
    } catch (error) {
      setError((error as Error)?.message || "Gagal melakukan voting");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    voteThread,
    isLoading,
    error,
  };
}
