import { forumService, PaginationParams } from "@/services";
import {
  ThreadSummaryResponse,
  ThreadDetailResponse,
  PaginationMeta,
} from "@/types";
import { useEffect, useState } from "react";

interface UseThreadsReturn {
  threads: ThreadSummaryResponse[] | null;
  meta: PaginationMeta | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useThreads(params: PaginationParams): UseThreadsReturn {
  const [threads, setThreads] = useState<ThreadSummaryResponse[] | null>(null);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
      setError(error.message || "gagal mengambil data thread");
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

interface UseThreadByIdReturn {
  thread: ThreadDetailResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useThreadById(threadId: string): UseThreadByIdReturn {
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
      setError(error.message || "gagal mengambil detail thread");
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
