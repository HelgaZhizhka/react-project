import { Component } from 'react';

import { ErrorBoundary } from './components/ErrorBoundary';
import { ErrorComponent } from './components/ErrorComponent';
import { Home } from './pages/Home';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <>
          <ErrorComponent className="error-component" />
          <Home />
        </>
      </ErrorBoundary>
    );
  }
}

export default App;
