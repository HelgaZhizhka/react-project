import { SearchInput } from '@/components/SearchInput';
import { Button } from '@/components/Button';
import styles from './Search.module.scss';

interface Props {
  value: string;
  onInputChange: (value: string) => void;
  onSearch: () => void;
}

const Search: React.FC<Props> = ({ value, onInputChange, onSearch }) => {
  const handleInputChange = (value: string) => {
    onInputChange(value);
  };

  const handleKeyDown = (value: string) => {
    onInputChange(value);
    onSearch();
  };

  return (
    <div className={styles.root}>
      <SearchInput
        className={styles.input}
        value={value}
        onChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        placeholder="Search..."
      />
      <Button onClick={onSearch}>Search</Button>
    </div>
  );
};

export default Search;
