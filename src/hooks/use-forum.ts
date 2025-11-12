import { forumService, PaginationParams } from "@/services";
import {
  ThreadSummaryResponse,
  ThreadDetailResponse,
  PaginationMeta,
  PostResponse,
} from "@/types";
import { set } from "date-fns";
import { useEffect, useState } from "react";

interface UseForumReturn {
  threads?: ThreadSummaryResponse[] | null;
  thread?: ThreadDetailResponse | null;
  posts?: PostResponse[] | null;
  meta?: PaginationMeta | null;
  isLoading: boolean;
  error: string | null;
  refetch?: () => void;
}

export function useThreads(params: PaginationParams): UseForumReturn {
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

export function useThreadById(threadId: string): UseForumReturn {
  const [thread, setThread] = useState<ThreadDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchThread = async () => {
    if (!threadId) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await forumService.getThreadById(threadId);
      setThread(response);
    } catch (error: any) {
      setError(error.message || "Gagal mengambil detail thread");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchThread();
  }, [threadId]);

  return {
    thread,
    isLoading,
    error,
    refetch: fetchThread,
  };
}

export function usePostsByThreadId(threadId: string): UseForumReturn {
  const [posts, setPosts] = useState<PostResponse[] | null>(null);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    if (!threadId) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await forumService.getPostsByThreadId(threadId);

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
  }, [threadId]);

  return {
    posts,
    meta,
    isLoading,
    error,
    refetch: fetchPosts,
  };
}
