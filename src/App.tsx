import { BrowserRouter as Router } from 'react-router-dom';

import { ErrorBoundary } from './components/ErrorBoundary';
import { AppRoutes } from './routes';

const App: React.FC = () => (
  <ErrorBoundary>
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  </ErrorBoundary>
);

export default App;
