import { Photo } from '@/utils/interfaces';
import { createContext } from 'react';

type ContextType = {
  searchResult: Photo[] | null;
  onItemClick: (id: number) => void;
};

const SearchResultContext = createContext<ContextType>({
  searchResult: null,
  onItemClick: () => {},
});

export default SearchResultContext;
