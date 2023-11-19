import { useState } from 'react';
import { useAppSelector } from '@/hooks';

import { SearchInput } from '@/components/SearchInput';
import { Button } from '@/components/Button';
import styles from './Search.module.scss';

interface Props {
  onSearch: (newValue: string) => void;
}

const Search: React.FC<Props> = ({ onSearch }) => {
  const searchQuery = useAppSelector((state) => state.search.query);
  const [query, setQuery] = useState(searchQuery);

  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  const handleSearch = (value: string) => {
    onSearch(value);
    setQuery('');
  };

  return (
    <div className={styles.root}>
      <SearchInput
        className={styles.input}
        value={query}
        onChange={handleInputChange}
        handleKeyDown={handleSearch}
        placeholder="Search..."
      />
      <Button onClick={() => handleSearch(query)}>Search</Button>
    </div>
  );
};

export default Search;
