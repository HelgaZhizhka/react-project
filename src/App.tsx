import { ErrorBoundary } from './components/ErrorBoundary';
import { ErrorComponent } from './components/ErrorComponent';
import { Home } from './pages/Home';

const App: React.FC = () => (
  <ErrorBoundary>
    <>
      <ErrorComponent className="error-component" />
      <Home />
    </>
  </ErrorBoundary>
);

export default App;
