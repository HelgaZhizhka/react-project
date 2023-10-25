import { Component } from 'react';

import { SearchInput } from '../SearchInput';
import { Button } from '../Button';
import styles from './Search.module.scss';

interface Props {
  value: string;
  onInputChange: (value: string) => void;
  onSearch: () => void;
}

class Search extends Component<Props> {
  handleInputChange = (value: string) => {
    this.props.onInputChange(value);
  };

  handleSearch = () => {
    this.props.onSearch();
  };

  render() {
    return (
      <div className={styles.root}>
        <SearchInput
          className={styles.input}
          value={this.props.value}
          onChange={this.handleInputChange}
          placeholder="Search..."
        />
        <Button onClick={this.handleSearch}>Search</Button>
      </div>
    );
  }
}

export default Search;
