import { useAppDispatch, useAppSelector } from '@/hooks';

import { setSearchQuery } from '@/features/search/searchSlice';
import { SearchInput } from '@/components/SearchInput';
import { Button } from '@/components/Button';
import styles from './Search.module.scss';

interface Props {
  onInputChange: (newValue: string) => void;
}

const Search: React.FC<Props> = ({ onInputChange }) => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.query);

  const handleInputChange = (value: string) => {
    dispatch(setSearchQuery(value));
  };

  const handleKeyDown = (value: string) => {
    dispatch(setSearchQuery(value));
    onInputChange(value);
  };

  return (
    <div className={styles.root}>
      <SearchInput
        className={styles.input}
        value={searchQuery}
        onChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        placeholder="Search..."
      />
      <Button onClick={() => onInputChange(searchQuery)}>Search</Button>
    </div>
  );
};

export default Search;
