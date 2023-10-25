import { Component, ChangeEvent } from 'react';

import styles from './SearchInput.module.scss';

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

class SearchInput extends Component<Props> {
  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { className, value, placeholder } = this.props;

    return (
      <input
        className={`${styles.root} ${className}`}
        type="search"
        value={value}
        onChange={this.handleInputChange}
        placeholder={placeholder || ''}
      />
    );
  }
}

export default SearchInput;
