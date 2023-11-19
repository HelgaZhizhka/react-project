import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Photo, SearchResponse } from '@/utils/interfaces';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

export const apiService = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    searchPhotos: builder.query<SearchResponse, { query: string; page: number; perPage: number }>({
      query: ({ query, page, perPage }) => ({
        url: `/search?query=${query}&page=${page}&per_page=${perPage}`,
        headers: { Authorization: API_KEY },
      }),
    }),
    getPopularity: builder.query<SearchResponse, { page: number; perPage: number }>({
      query: ({ page, perPage }) => ({
        url: `/curated?page=${page}&per_page=${perPage}`,
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

export const { useSearchPhotosQuery, useGetPopularityQuery, useGetPhotoQuery } = apiService;
