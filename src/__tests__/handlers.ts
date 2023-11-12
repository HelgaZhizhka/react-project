import { http, HttpResponse } from 'msw'
import { ResponseData } from './mockData';

const API_URL = import.meta.env.VITE_API_URL;

export const handlers = [
  http.get(`${API_URL}/curated`, () => {
    return HttpResponse.json({
      results: ResponseData,
    });
  }),
]