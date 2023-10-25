import { Component } from 'react';

import { apiSearch } from '../../api';
import { Movie } from '../../types/interfaces';
import { Status } from '../../types/types';
import { Search } from '../../components/Search';
import { SearchResult } from '../../components/SearchResult';
import styles from './Home.module.scss';

interface State {
  searchValue: string;
  searchResults: Movie[];
  status: Status;
  error: string;
}

class Home extends Component<never, State> {
  state: State = {
    searchValue: localStorage.getItem('searchValue') || '',
    searchResults: [],
    status: 'idle',
    error: '',
  };

  handleInputChange = async (newValue: string): Promise<void> => {
    this.setState({ searchValue: newValue });
  };

  handleSearch = async (): Promise<void> => {
    this.setState({ status: 'loading' });

    try {
      const value = this.state.searchValue.trim();
      localStorage.setItem('searchValue', value);
      const data = await apiSearch(value);
      if (data.results.length) {
        this.setState({ searchResults: data.results, status: 'success' });
      } else {
        this.setState({ searchResults: [], status: 'success' });
      }
    } catch (error) {
      this.setState({ status: 'error' });
    }
  };

  componentDidMount() {
    if (this.state.searchValue) {
      this.handleSearch();
    } else {
      this.setState({ status: 'idle' });
    }
  }

  render() {
    const { searchValue, searchResults, status } = this.state;

    let content;

    switch (status) {
      case 'idle':
        content = <h2>Find your favorite movie!</h2>;
        break;
      case 'loading':
        content = <p>Loading...</p>;
        break;
      case 'success':
        content = searchResults.length ? (
          <SearchResult results={searchResults} />
        ) : (
          <h3>Nothing was found for your query. Try another query.</h3>
        );
        break;
      case 'error':
        content = <h3>Something went wrong. Try again.</h3>;
        break;
      default:
        content = <p>Unknown condition.</p>;
    }

    return (
      <div className={styles.container}>
        <Search
          value={searchValue}
          onInputChange={this.handleInputChange}
          onSearch={this.handleSearch}
        />
        <div className={styles.section}>{content}</div>
      </div>
    );
  }
}

export default Home;
