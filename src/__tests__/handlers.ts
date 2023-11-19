import { http, HttpResponse } from 'msw'
import { PhotoItem, ResponseData } from './mockData';

const API_URL = import.meta.env.VITE_API_URL;

export const handlers = [
  http.get(`${API_URL}/curated`, () => {
    return HttpResponse.json(ResponseData);
  }),
  http.get(`${API_URL}/search`, () => {
    return HttpResponse.json(ResponseData);
  }),
  http.get(`${API_URL}/photos/:id`, () => {
    return HttpResponse.json(PhotoItem);
  }),
]