import { Photo } from '@/utils/interfaces';
import { createContext } from 'react';

type ContextType = {
  searchResult: Photo[] | null;
  currentPage: number;
};

const SearchResultContext = createContext<ContextType>({
  searchResult: null,
  currentPage: 1,
});

export default SearchResultContext;
