import { Component, ChangeEvent } from 'react';

import styles from './SearchInput.module.scss';

interface Props {
  value: string;
  onChange: (value: string) => void;
  handleKeyDown: (value: string) => void;
  className?: string;
  placeholder?: string;
}

class SearchInput extends Component<Props> {
  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.value);
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.props.handleKeyDown(event.currentTarget.value);
    }
  };

  render() {
    const { className, value, placeholder } = this.props;

    return (
      <input
        className={`${styles.root} ${className}`}
        type="text"
        value={value}
        onChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        placeholder={placeholder || ''}
        autoFocus
      />
    );
  }
}

export default SearchInput;
