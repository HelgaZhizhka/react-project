import { createContext } from 'react';

type ContextType = {
  cardId: number;
  currentPage: number;
  perPage: number;
  isDetails: boolean;
};

const SearchResultContext = createContext<ContextType>({
  cardId: 0,
  currentPage: 0,
  perPage: 0,
  isDetails: false,
});

export default SearchResultContext;
