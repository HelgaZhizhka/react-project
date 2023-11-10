import { PER_PAGE } from '@/components/Select/Select.enums';
import { ApiError, Photo, SearchResponse } from '@/utils/interfaces';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

export const apiSearch = async (
  query: string,
  page: number = 1,
  per_page: number = 15
): Promise<SearchResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`,
      {
        headers: {
          Authorization: API_KEY,
        },
      }
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

export const apiGetPopularity = async (
  page: number = 1,
  per_page: number = PER_PAGE[10]
): Promise<SearchResponse> => {
  try {
    const response = await fetch(`${API_URL}/curated?page=${page}&per_page=${per_page}`, {
      headers: {
        Authorization: API_KEY,
      },
    });

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

export const apiGetPhoto = async (id: number): Promise<Photo> => {
  try {
    const response = await fetch(`${API_URL}/photos/${id}`, {
      headers: {
        Authorization: API_KEY,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorData: ApiError = {
        message:
          errorResponse.status_message || `API request failed with status ${response.status}`,
        status: response.status,
      };

      throw errorData;
    }

    const data: Photo = await response.json();
    return data;
  } catch (error: unknown) {
    throw error;
  }
};
