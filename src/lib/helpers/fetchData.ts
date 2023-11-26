import { AppStore } from '../redux/store';

import { getPopularity, searchPhotos } from '@/lib/services/apiService';
import { SearchResponse } from '@/lib/types/interfaces';

export const fetchData = async (
  store: AppStore,
  query: string,
  page: number,
  per_page: number
): Promise<SearchResponse | null> => {
  try {
    let data: SearchResponse;

    if (query) {
      data = await store.dispatch(searchPhotos.initiate({ query, page, per_page })).unwrap();
    } else {
      data = await store.dispatch(getPopularity.initiate({ page, per_page })).unwrap();
    }

    return data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
};
