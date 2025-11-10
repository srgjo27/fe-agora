export interface PostResponse {
  id: string;
  content: string;
  user_id: string;
  thread_id: string;
  parent_post_id?: string;
  vote_count: number;
  created_at: string;
  updated_at?: string;
}
