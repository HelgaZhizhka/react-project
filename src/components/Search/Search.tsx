import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';

import { setSearchQuery } from '@/features/search/searchSlice';
import { SearchInput } from '@/components/SearchInput';
import { Button } from '@/components/Button';
import styles from './Search.module.scss';

interface Props {
  onSearch: (newValue: string) => void;
}

const Search: React.FC<Props> = ({ onSearch }) => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.query);
  const [query, setQuery] = useState(searchQuery);

  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  const handleKeyDown = (value: string) => {
    dispatch(setSearchQuery(value));
    onSearch(value);
  };

  return (
    <div className={styles.root}>
      <SearchInput
        className={styles.input}
        value={query}
        onChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        placeholder="Search..."
      />
      <Button onClick={() => onSearch(searchQuery)}>Search</Button>
    </div>
  );
};

export default Search;
