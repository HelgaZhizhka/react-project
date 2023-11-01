import { useState, useEffect, useCallback } from 'react';

import { apiGetPopularity, apiSearch } from '../../api';
import { Movie } from '../../utils/interfaces';
import { Status } from '../../utils/types';
import { hasErrorMessage } from '../../utils/functions';
import { Search } from '../../components/Search';
import { SearchResult } from '../../components/SearchResult';
import { Spinner } from '../../components/Spinner';
import { NotFound } from '../../components/NotFound';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>(localStorage.getItem('searchValue') || '');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string>('');

  const handleInputChange = useCallback((newValue: string): void => {
    setSearchValue(newValue);
    localStorage.setItem('searchValue', newValue);
  }, []);

  const resetSearchResults = (): void => {
    setStatus('loading');
    setSearchResults([]);
  };

  const handleSearch = async (): Promise<void> => {
    resetSearchResults();

    try {
      let data;
      if (searchValue.trim()) {
        data = await apiSearch(searchValue.trim());
      } else {
        data = await apiGetPopularity();
      }

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
    handleSearch();
  }, []);

  return (
    <div className={styles.container}>
      <Search value={searchValue} onInputChange={handleInputChange} onSearch={handleSearch} />
      <div className={styles.section}>{renderContent()}</div>
    </div>
  );
};

export default Home;
