import { Component } from 'react';

import { apiSearch } from '../../api';
import { Movie } from '../../types/interfaces';
import { Search } from '../../components/Search';
import { SearchResult } from '../../components/SearchResult';
import styles from './Home.module.scss';

interface State {
  searchValue: string;
  searchResults: Movie[];
}

class Home extends Component<never, State> {
  state = {
    searchValue: localStorage.getItem('searchValue') || '',
    searchResults: [],
  };

  handleInputChange = async (newValue: string): Promise<void> => {
    this.setState({ searchValue: newValue });
  };

  handleSearch = async (): Promise<void> => {
    try {
      localStorage.setItem('searchValue', this.state.searchValue);
      const data = await apiSearch(this.state.searchValue);
      this.setState({ searchResults: data.results });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    if (this.state.searchValue) {
      this.handleSearch();
    }
  }

  render() {
    const { searchResults } = this.state;

    return (
      <div className={styles.container}>
        <Search
          value={this.state.searchValue}
          onInputChange={this.handleInputChange}
          onSearch={this.handleSearch}
        />
        <div className={styles.section}>
          <SearchResult results={searchResults} />
        </div>
      </div>
    );
  }
}

export default Home;
