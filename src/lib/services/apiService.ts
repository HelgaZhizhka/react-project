import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { Photo, SearchResponse } from '@/lib/types/interfaces';

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

export const apiService = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    searchPhotos: builder.query<
      SearchResponse,
      {
        query: string;
        page: number;
        per_page: number;
      }
    >({
      query: ({ query, page, per_page }) => ({
        url: `/search?query=${query}&page=${page}&per_page=${per_page}`,
        headers: { Authorization: API_KEY },
      }),
    }),
    getPopularity: builder.query<
      SearchResponse,
      {
        page: number;
        per_page: number;
      }
    >({
      query: ({ page, per_page }) => ({
        url: `/curated?page=${page}&per_page=${per_page}`,
        headers: {
          Authorization: API_KEY,
        },
      }),
    }),
    getPhoto: builder.query<Photo, number>({
      query: (id: number) => ({
        url: `/photos/${id}`,
        headers: {
          Authorization: API_KEY,
        },
      }),
    }),
  }),
});

export const {
  useSearchPhotosQuery,
  useGetPopularityQuery,
  useGetPhotoQuery,
  util: { getRunningQueriesThunk },
} = apiService;

export const { searchPhotos, getPopularity, getPhoto } = apiService.endpoints;
