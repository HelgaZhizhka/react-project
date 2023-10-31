import { Component } from 'react';

import { Button } from '../Button';
import styles from './ErrorComponent.module.scss';

interface State {
  throwError: boolean;
}

interface Props {
  className: string;
}

class ErrorComponent extends Component<Props, State> {
  state = { throwError: false };

  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('I crashed!');
    }

    return (
      <Button className={`${styles.button} ${this.props.className}`} onClick={this.handleClick}>
        Trigger Error
      </Button>
    );
  }
}

export default ErrorComponent;
