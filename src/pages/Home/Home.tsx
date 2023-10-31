import { useState, useEffect } from 'react';

import { apiGetPopularity, apiSearch } from '../../api';
import { Movie } from '../../utils/interfaces';
import { Status } from '../../utils/types';
import { hasErrorMessage } from '../../utils/functions';
import { Search } from '../../components/Search';
import { SearchResult } from '../../components/SearchResult';
import { Spinner } from '../../components/Spinner';
import { NotFound } from '../../components/NotFound';
import styles from './Home.module.scss';

// interface State {
//   searchValue: string;
//   searchResults: Movie[];
//   status: Status;
//   error: string;
// }

interface Props {
  className?: string;
}

const Home: React.FC<Props> = () => {
  const [searchValue, setSearchValue] = useState<string>(localStorage.getItem('searchValue') || '');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string>('');

  const handleInputChange = (newValue: string): void => {
    setSearchValue(newValue);
  };

  const handleSearch = async (): Promise<void> => {
    setStatus('loading');
    setSearchResults([]);

    if (!searchValue) {
      loadingData();
      return;
    }

    try {
      const value = searchValue.trim();
      localStorage.setItem('searchValue', value);
      const data = await apiSearch(value);

      setSearchResults(data.results);
      setStatus(data.results.length ? 'success' : 'empty');
    } catch (error: unknown) {
      setStatus('error');
      setError(hasErrorMessage(error) ? error.message : 'Unknown error.');
    }
  };

  const loadingData = async (): Promise<void> => {
    setStatus('loading');
    setSearchResults([]);

    try {
      const data = await apiGetPopularity();
      setSearchResults(data.results);
      setStatus(data.results.length ? 'success' : 'empty');
    } catch (error: unknown) {
      setStatus('error');
      setError(hasErrorMessage(error) ? error.message : 'Unknown error.');
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return <Spinner size="large" variant="global" />;
      case 'success':
        return <SearchResult results={searchResults} />;
      case 'error':
        return <h3 className={styles.error}>{error}. Try again.</h3>;
      case 'empty':
        return <NotFound />;
      default:
        return <p>Oops! Something went unknown...</p>;
    }
  };

  useEffect(() => {
    if (searchValue) {
      handleSearch();
    } else {
      loadingData();
    }
  }, []);

  return (
    <div className={styles.container}>
      <Search value={searchValue} onInputChange={handleInputChange} onSearch={handleSearch} />
      <div className={styles.section}>{renderContent()}</div>
    </div>
  );
};

export default Home;
