import { Component } from 'react';

import styles from './Button.module.scss';

interface Props {
  children: string;
  onClick: () => void;
  className?: string;
}

class Button extends Component<Props> {
  render() {
    const { className, onClick, children } = this.props;

    const btnClass = !className ? styles.root : `${styles.root} ${className}`;

    return (
      <button className={btnClass} onClick={onClick}>
        {children}
      </button>
    );
  }
}

export default Button;
