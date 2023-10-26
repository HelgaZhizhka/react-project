import { ApiError, Movie } from '../utils/interfaces';

export interface SearchResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

const apiSearch = async (searchValue: string): Promise<SearchResponse> => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(
      `${API_URL}/search/1movie?query=${searchValue}&api_key=${API_KEY}`
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorData: ApiError = {
        message:
          errorResponse.status_message || `API request failed with status ${response.status}`,
        status: response.status,
      };
      throw errorData;
    }

    const data: SearchResponse = await response.json();
    return data;
  } catch (error: unknown) {
    throw error;
  }
};

export default apiSearch;
