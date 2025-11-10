export interface CategoryResponse {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

export interface CategoryRequest {
  name: string;
  description?: string;
}

export interface CategoryInfoResponse {
  id: string;
  name: string;
  slug: string;
}
