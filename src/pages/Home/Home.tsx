import { Component } from 'react';

import { apiGetPopularity, apiSearch } from '../../api';
import { Movie } from '../../utils/interfaces';
import { Status } from '../../utils/types';
import { hasErrorMessage } from '../../utils/functions';
import { Search } from '../../components/Search';
import { SearchResult } from '../../components/SearchResult';
import { Spinner } from '../../components/Spinner';
import { NotFound } from '../../components/NotFound';
import styles from './Home.module.scss';

interface State {
  searchValue: string;
  searchResults: Movie[];
  status: Status;
  error: string;
}

interface Props {
  className?: string;
}

class Home extends Component<Props, State> {
  state: State = {
    searchValue: localStorage.getItem('searchValue') || '',
    searchResults: [],
    status: 'loading',
    error: '',
  };

  handleInputChange = (newValue: string): void => {
    this.setState({ searchValue: newValue });
  };

  handleSearch = async (): Promise<void> => {
    this.setState({ status: 'loading', searchResults: [] });

    if (!this.state.searchValue) {
      this.loadingData();
      return;
    }

    try {
      const value = this.state.searchValue.trim();
      localStorage.setItem('searchValue', value);
      const data = await apiSearch(value);

      this.setState({
        searchResults: data.results,
        status: data.results.length ? 'success' : 'empty',
      });
    } catch (error: unknown) {
      this.setState({
        status: 'error',
        error: hasErrorMessage(error) ? error.message : 'Unknown error.',
      });
    }
  };

  loadingData = async (): Promise<void> => {
    this.setState({ status: 'loading', searchResults: [] });

    try {
      const data = await apiGetPopularity();
      this.setState({
        searchResults: data.results,
        status: data.results.length ? 'success' : 'empty',
      });
    } catch (error: unknown) {
      this.setState({
        status: 'error',
        error: hasErrorMessage(error) ? error.message : 'Unknown error.',
      });
    }
  };

  componentDidMount() {
    if (this.state.searchValue) {
      this.handleSearch();
    } else {
      this.loadingData();
    }
  }

  renderContent = () => {
    switch (this.state.status) {
      case 'loading':
        return <Spinner size="large" variant="global" />;
      case 'success':
        return <SearchResult results={this.state.searchResults} />;
      case 'empty':
        return <NotFound />;
      case 'error':
        return <h3 className={styles.error}>{this.state.error}. Try again.</h3>;
      default:
        return <p>Oops! Something went unknown...</p>;
    }
  };

  render() {
    const { searchValue } = this.state;

    return (
      <div className={styles.container}>
        <Search
          value={searchValue}
          onInputChange={this.handleInputChange}
          onSearch={this.handleSearch}
        />
        <div className={styles.section}>{this.renderContent()}</div>
      </div>
    );
  }
}

export default Home;
