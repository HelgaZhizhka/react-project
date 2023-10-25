import { ApiError, Movie } from '../types/interfaces';

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
    const response = await fetch(`${API_URL}/search/movie?query=${searchValue}&api_key=${API_KEY}`);

    if (!response.ok) {
      const errorData: ApiError = {
        message: `API request failed with status ${response.status}`,
        status: response.status,
      };
      throw errorData;
    }

    const data: SearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    if (typeof error === 'string') {
      throw { message: error };
    } else {
      throw error;
    }
  }
};

export default apiSearch;
