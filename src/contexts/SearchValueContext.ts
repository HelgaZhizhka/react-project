import { createContext } from 'react';

type ContextType = {
  value: string;
};

const SearchValueContext = createContext<ContextType>({
  value: '',
});

export default SearchValueContext;
