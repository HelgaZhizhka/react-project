import { Button } from '@/components/Button';
import styles from './Search.module.scss';

interface Props {
  onSearch: (newValue: string) => void;
}

const Search: React.FC<Props> = ({ onSearch }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const query = formData.get('query');

    if (typeof query === 'string') {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(event.currentTarget.value.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.root}>
        <input
          className={styles.input}
          type="text"
          name="query"
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          autoFocus={true}
        />
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
};

export default Search;
