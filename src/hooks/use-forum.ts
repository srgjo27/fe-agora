import { forumService, PaginationParams } from "@/services";
import {
  ThreadSummaryResponse,
  ThreadDetailResponse,
  PaginationMeta,
  PostResponse,
} from "@/types";
import { useEffect, useState } from "react";

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

export function useThreads(params: PaginationParams): UseThreadsReturn {
  const [threads, setThreads] = useState<ThreadSummaryResponse[] | null>(null);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { page, limit } = params;

  const fetchThreads = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await forumService.getThreads({ page, limit });

      setThreads(response.data);
      setMeta(response.meta);
    } catch (error: any) {
      setError(error.message || "Gagal mengambil data thread");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, [page, limit]);

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

  const fetchThread = async () => {
    if (!thread_id) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await forumService.getThreadById(thread_id);
      setThread(response);
    } catch (error: any) {
      setError(error.message || "Gagal mengambil detail thread");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchThread();
  }, [thread_id]);

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

  const fetchPosts = async () => {
    if (!thread_id) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await forumService.getPostsByThreadId(thread_id);

      setPosts(response.data);
      setMeta(response.meta);
    } catch (error: any) {
      setError(error.message || "Gagal mengambil data post");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [thread_id]);

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
    } catch (error: any) {
      setError(error.message || "Gagal membuat balasan publik");

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
