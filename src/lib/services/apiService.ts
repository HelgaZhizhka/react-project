import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { Photo, SearchResponse } from '@/utils/interfaces';

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
        query: string | string[] | undefined;
        page: string | number | string[] | undefined;
        perPage: string | number | string[] | undefined;
      }
    >({
      query: ({ query, page, perPage }) => ({
        url: `/search?query=${query}&page=${page}&per_page=${perPage}`,
        headers: { Authorization: API_KEY },
      }),
    }),
    getPopularity: builder.query<
      SearchResponse,
      {
        page: string | number | string[] | undefined;
        perPage: string | number | string[] | undefined;
      }
    >({
      query: ({ page, perPage }) => ({
        url: `/curated?page=${page}&per_page=${perPage}`,
        headers: {
          Authorization: API_KEY,
        },
      }),
    }),
    getPhoto: builder.query<Photo, number>({
      query: (id) => ({
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
