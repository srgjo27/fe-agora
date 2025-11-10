export type User = {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  role: string;
  created_at: string;
};

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  role: string;
  created_at: string;
}

export interface AuthorResponse {
  id: string;
  username: string;
  avatar_url?: string;
}
