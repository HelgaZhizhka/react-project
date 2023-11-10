export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  alt: string;
}

export interface SearchResponse {
  page: number;
  per_page: number;
  photos: Photo[];
  total_results: number;
  prev_page?: string;
  next_page?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
