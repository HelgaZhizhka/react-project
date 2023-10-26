import { Component } from 'react';

import { apiSearch } from '../../api';
import { Movie } from '../../utils/interfaces';
import { Status } from '../../utils/types';
import { hasErrorMessage } from '../../utils/functions';
import { Search } from '../../components/Search';
import { SearchResult } from '../../components/SearchResult';
import { Spinner } from '../../components/Spinner';
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
    status: 'idle',
    error: '',
  };

  handleInputChange = (newValue: string): void => {
    this.setState({ searchValue: newValue });
  };

  handleSearch = async (): Promise<void> => {
    this.setState({ status: 'loading', searchResults: [] });

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

  componentDidMount() {
    if (this.state.searchValue) {
      this.handleSearch();
    } else {
      this.setState({ status: 'idle' });
    }
  }

  renderIdle = () => <h2>Find your favorite movie!</h2>;

  renderLoading = () => <Spinner />;

  renderSuccess = () => <SearchResult results={this.state.searchResults} />;

  renderEmpty = () => <h3>Nothing was found for your query. Try another query.</h3>;

  renderError = () => <h3 className={styles.error}>{this.state.error}. Try again.</h3>;

  renderContent = () => {
    switch (this.state.status) {
      case 'idle':
        return this.renderIdle();
      case 'loading':
        return this.renderLoading();
      case 'success':
        return this.renderSuccess();
      case 'empty':
        return this.renderEmpty();
      case 'error':
        return this.renderError();
      default:
        return <p>Unknown condition.</p>;
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
