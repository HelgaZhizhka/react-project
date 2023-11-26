import { useRouter } from 'next/router';
import { useState } from 'react';

import { currentPage, defaultPerPage } from '@/lib/types/constants';
import { Button } from '@/components/Button';
import styles from './Search.module.scss';

const Search: React.FC = () => {
  const router = useRouter();
  const { query = '', page = currentPage, per_page = defaultPerPage } = router.query;
  const [searchValue, setSearchValue] = useState(query);

  const handleSearch = () => {
    if (searchValue) {
      router.push(`/?query=${searchValue}&page=${page}&per_page=${per_page}`);
    } else {
      router.push(`/?page=${page}&per_page=${per_page}`);
    }
    setSearchValue('');
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setSearchValue(value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      setSearchValue(event.currentTarget.value);
      handleSearch();
    }
  };

  return (
    <div className={styles.root}>
      <input
        className={styles.input}
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={searchValue}
        placeholder="Search..."
        autoFocus={true}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default Search;
