import { DefaultBodyType, PathParams, RequestHandler, http } from 'msw'
import { SearchResponse, Photo } from '@/utils/interfaces';

const API_URL = import.meta.env.VITE_API_URL;

const mockPhoto: Photo = {
  id: 1,
  width: 1,
  height: 1,
  url: 'string',
  photographer: 'string',
  photographer_url: 'string',
  photographer_id: 1,
  avg_color: 'string',
  src: {
    original: 'string',
    large2x: 'string',
    large: 'string',
    medium: 'string',
    small: 'string',
    portrait: 'string',
    landscape: 'string',
    tiny: 'string',
  },
  alt: 'string',
};

const mockSearchResponse: SearchResponse = {
  page: 1,
  per_page: 10,
  photos: [mockPhoto],
  total_results: 1,
};

export const handlers: RequestHandler[] = [
  http.get<PathParams, DefaultBodyType, undefined>(`${API_URL}/search/:query`, (req, res, ctx)   => {
    const query = req.params.query;

    console.log(query)
    return res(
      ctx.status(200),
      ctx.json(mockSearchResponse)
    );
  }),

  http.get<PathParams, DefaultBodyType, undefined>(`${API_URL}/curated`, (req, res, ctx) => {
     const {data} = req.body;
     console.log(data)
    return res(
      ctx.status(200),
      ctx.json(mockSearchResponse)
    );
  }),

  http.get<PathParams, DefaultBodyType, undefined>(`${API_URL}/photos/:id`, (req, res, ctx) => {
    const { id } = req.params;
    console.log(id)
    
    return res(
      ctx.status(200),
      ctx.json(mockPhoto)
    );
  }),

];
