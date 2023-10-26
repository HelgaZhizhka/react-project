import { Component, ErrorInfo } from 'react';

import styles from './ErrorBoundary.module.scss';
import { Button } from '../Button';

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

interface Props {
  children: JSX.Element;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.root}>
          <h1 className={styles['error-message']}>Oops! Something went wrong...</h1>
          <p>We encountered a problem trying to display this section.</p>
          <p>Please try refreshing the page or come back later.</p>
          <details className={styles['error-details']}>
            <p>{this.state.error && this.state.error.toString()}</p>
            <p>{this.state.errorInfo?.componentStack}</p>
          </details>
          <Button onClick={this.handleReload}>Reload App</Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
