import { CategoryInfoResponse } from "./category";
import { AuthorResponse } from "./user";

export interface ThreadSummaryResponse {
  id: string;
  title: string;
  slug: string;
  author?: AuthorResponse;
  category?: CategoryInfoResponse;
  is_pinned: boolean;
  is_locked: boolean;
  vote_count: number;
  created_at: string;
}

export interface ThreadDetailResponse {
  id: string;
  title: string;
  slug: string;
  content: string;
  author?: AuthorResponse;
  category?: CategoryInfoResponse;
  is_pinned: boolean;
  is_locked: boolean;
  vote_count: number;
  created_at: string;
  updated_at?: string;
}

export interface ThreadRequest {
  title: string;
  content: string;
  category_id: string;
}
