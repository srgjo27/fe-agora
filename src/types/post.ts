import { AuthorResponse } from "@/types";

export interface PostResponse {
  id: string;
  content: string;
  author?: AuthorResponse;
  thread_id: string;
  parent_post_id?: string;
  vote_count: number;
  created_at: string;
  updated_at?: string;
}
